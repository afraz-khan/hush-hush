import base64
import hashlib
from re import search
from cryptography.fernet import Fernet
import os
import json
from Crypto import Random
from Crypto.PublicKey import RSA
from Crypto.Random import get_random_bytes
from Crypto.Cipher import AES, PKCS1_OAEP
import pickle

class Account:
	'''Handles functionality for managing your digital account credentials
	'''

	def __init__(self) -> None:
		'''loads previous cipher text having all creds
		'''
		self.cipher = {} # main creds cipher
		self.fernet  = Fernet(base64.b64decode(bytes(os.environ['CIPHER_SECRET'], encoding='utf-8')))
		if os.stat(os.environ['CIPHER']).st_size > 0:
			f = open(os.environ['CIPHER'], 'rb')
			hash_data = f.read()
			self.cipher = pickle.loads(self.fernet.decrypt(hash_data)) # cipher data is pickel saved
			f.close()																									 # to bytes
	
	def create(self, data):
		'''creats new bytes tuple for a new digital account 
		and dumps in main cipher file storage
		'''

		already_exists = self.findOneByOrigin(data['origin'])
		if(already_exists):
			return None
		self.cipher[self.key_hash(data['origin'])] = self.encrypt_blob(data['origin'], data['username'], data['password'])
		self.update_hash()
		return True
	
	def findOneByOrigin(self, origin):
		'''searchs a single origin of a digital account
		'''

		origin_hash = self.key_hash(origin)
		try:
			return self.construct_creds(self.cipher[origin_hash])
		except KeyError as e:
			return None

	def search(self, term = ''):
		data = [x for x in self.load_creds_list()]
		if(term != ''):
			result=[]
			term.strip()
			words = term.split()
			data = [x for x in self.load_creds_list()]
			for word in words:
				for record in data:
					if(word.lower() in record['origin'].lower() and record not in result):
						result.append(record)
			return result
		return data

	def delete_account(self, origin):
		deleted_account = self.cipher.pop(self.key_hash(origin), None)
		if(deleted_account):
			self.update_hash()
			return True
		return False

	def update_account(self, origin, data):
		account = self.findOneByOrigin(origin)
		if(account):
			for prop in data:
				account[prop] = data[prop]
			self.cipher[self.key_hash(origin)] = self.encrypt_blob(origin, account['username'], account['password'])
			self.update_hash()
			return True
		return False

	def update_hash(self):
		encrypted = self.fernet.encrypt(pickle.dumps(self.cipher))
		
		f = open(os.environ['CIPHER'],'wb')
		f.write(encrypted)
		f.close()

	def load_creds_list(self):
		data = []
		for k in self.cipher.keys():
			data.append(self.construct_creds(self.cipher[k]))
		return data

	def encrypt_blob(self, origin, username, password):
		'''
		1. reverses binary representation of both username & password.
		2. converts to bytes with pickle and creates a respective bytes array using
			 asymmetric encryption.
		'''

		data = [
			self.string_to_binary(origin)[::-1],
			self.string_to_binary(username)[::-1],
			self.string_to_binary(password)[::-1]
		]
		recipient_key = RSA.import_key(open("receiver.pem").read())
		session_key = get_random_bytes(16)
		
		# Encrypt the session key with the public RSA key
		cipher_rsa = PKCS1_OAEP.new(recipient_key)
		enc_session_key = cipher_rsa.encrypt(session_key)

		# Encrypt the data with the AES session key
		cipher_aes = AES.new(session_key, AES.MODE_EAX)
		ciphertext, tag = cipher_aes.encrypt_and_digest(pickle.dumps(data))

		return [enc_session_key, cipher_aes.nonce, tag, ciphertext]

	def construct_creds(self, creds_data):
		raw_origin, raw_username, raw_password = [ x.split() for x in self.decrypt_blob(creds_data)]
		origin = username = password = ''
		for i in reversed(range(len(raw_username))):
			username += self.binary_to_string(raw_username[i][::-1])
		for i in reversed(range(len(raw_password))):
			password += self.binary_to_string(raw_password[i][::-1])
		for i in reversed(range(len(raw_origin))):
			origin += self.binary_to_string(raw_origin[i][::-1])
		return {
			'origin': origin,
			'username': username,
			'password': password
		}

	def decrypt_blob(self, data):
		'''
		1. takes bytes blob of a digital username/password pair and decodes it
		   from bytes to regular form using pickle.
		2. uses private key for decryption of blob.
		'''

		private_key = RSA.import_key(open("private.pem").read())

		# enc_session_key, nonce, tag, ciphertext = \
		# 	[ file_in.read(x) for x in (private_key.size_in_bytes(), 16, 16, -1) ]
		enc_session_key = data[0]
		nonce = data[1]
		tag = data[2]
		ciphertext = data[3]

		# Decrypt the session key with the private RSA key
		cipher_rsa = PKCS1_OAEP.new(private_key)
		session_key = cipher_rsa.decrypt(enc_session_key)

		# Decrypt the data with the AES session key
		cipher_aes = AES.new(session_key, AES.MODE_EAX, nonce)
		return pickle.loads(cipher_aes.decrypt_and_verify(ciphertext, tag))

	def string_to_binary(self, string):
		'''returns binary representation of a string
		'''
		return ' '.join('{:08b}'.format(d) for d in bytearray(string, 'utf-8'))

	def binary_to_string(self, string):
		'''converts back a binary string to normal ascii string
		'''

		binary_values = string.split()
		ascii_string = ""

		for binary_value in binary_values:
				an_integer = int(binary_value, 2) # Convert to base 2 decimal integer
				ascii_character = chr(an_integer) # Convert to ASCII character
				ascii_string += ascii_character   # Append character to `ascii_string`
		return ascii_string

	def key_hash(self, string):
		'''creates binary rep of a string, reverses that binary rep and returns 
		a hash using below hashlib algo.
		'''

		binary_key = self.string_to_binary(string)[::-1] # reverse the binary string
		return hashlib.sha256(binary_key.encode(encoding='UTF-8', errors='strict')).hexdigest()
	
# asd = Account()
# print(asd.string_to_binary('afraz'))
# asd.create(username='waleed', password='1234', origin='MS')
# print(asd.search('FS'))