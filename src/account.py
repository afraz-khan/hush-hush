import base64
import hashlib
from cryptography.fernet import Fernet
import os
import json
from Crypto import Random
from Crypto.PublicKey import RSA
from Crypto.Random import get_random_bytes
from Crypto.Cipher import AES, PKCS1_OAEP
import pickle

os.environ['secret'] = 'TXN2TE15aWZpb0l0NFZSRjM4MEMwRHNxTXY2QmF6UDdqRjhoMC1VZDhrUT0='
os.environ['cipher'] = 'hash.json'

class Account:
	def __init__(self) -> None:
			self.cipher = {}
			self.fernet  = Fernet(base64.b64decode(bytes(os.environ['secret'], encoding='utf-8')))
			if os.stat(os.environ['cipher']).st_size > 0:
				f = open(os.environ['cipher'], 'rb')
				hash_data = f.read()
				self.cipher = pickle.loads(self.fernet.decrypt(hash_data))
				f.close()
	
	def create(self, origin, username, password):
		# if os.stat(os.environ['master_hash']).st_size > 0:
		# 	f = open(os.environ['master_hash'], 'rb')
		# 	hash_data = f.read()
		# 	accounts = pickle.loads(self.fernet.decrypt(hash_data))
		# 	f.close()

		self.cipher[self.key_hash(origin)] = self.encrypt_creds(username, password)
		encrypted = self.fernet.encrypt(pickle.dumps(self.cipher))
		
		f = open(os.environ['cipher'],'wb')
		f.write(encrypted)
		f.close()
	
	def search(self, origin):
		origin_hash = self.key_hash(origin)
		raw_username, raw_password = [ x.split() for x in self.decrypt_creds(self.cipher[origin_hash])]
		username = password = ''
		for i in reversed(range(len(raw_username))):
			username += self.binary_to_string(raw_username[i][::-1])
		for i in reversed(range(len(raw_password))):
			password += self.binary_to_string(raw_password[i][::-1])
		print(username, password)
	def binary_string(self, string):
		return ' '.join('{:08b}'.format(d) for d in bytearray(string, 'utf-8'))

	def binary_to_string(self, string):
		binary_values = string.split()
		ascii_string = ""

		for binary_value in binary_values:
				an_integer = int(binary_value, 2) # Convert to base 2 decimal integer
				ascii_character = chr(an_integer) # Convert to ASCII character
				ascii_string += ascii_character   # Append character to `ascii_string`
		return ascii_string

	def key_hash(self, string):
		binary_key = self.binary_string(string)[::-1] # reverse the binary string
		return hashlib.sha256(binary_key.encode(encoding='UTF-8', errors='strict')).hexdigest()

	def encrypt_creds(self, username, password):

		data = [
			self.binary_string(username)[::-1],
			self.binary_string(password)[::-1]
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

	def decrypt_creds(self, data):
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
		
asd = Account()
# print(asd.binary_string('afraz'))
# asd.create(username='waleed', password='1234', origin='MS')
asd.search('FB')