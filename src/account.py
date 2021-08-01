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
os.environ['hash'] = 'hash.json'

class Account:
	def __init__(self, origin, username, password) -> None:
			self.origin = origin
			self.username = username
			self.password = password
			self.secret = base64.b64decode(bytes(os.environ['secret'], encoding='utf-8'))
			self.fernet = Fernet(self.secret)
	
	def create(self):
		accounts = {}
		hash_data = None

		if os.stat(os.environ['hash']).st_size > 0:
			f = open(os.environ['hash'], 'rb')
			hash_data = f.read()
			accounts = json.loads(self.fernet.decrypt(hash_data))
			f.close()

		accounts[self.key_hash()] = self.encrypt_creds()
		print(accounts)
		encrypted = self.fernet.encrypt(pickle.dumps(accounts))
		
		f = open(os.environ['hash'],'wb')
		hash_data = f.write(encrypted)
		f.close()
	
	def search(self):
		accounts = {}
		hash_data = None

		f = open(os.environ['hash'],'rb')
		hash_data = f.read()
		f.close()
		fernet = Fernet(self.secret)
		encrypted=fernet.decrypt(hash_data)
		print(json.loads(encrypted))
		# f2 = open('output.json', 'wb')
		# f2.write(encrypted)
		# f2.close()

	def binary_string(self, string):
		return ' '.join('{:08b}'.format(d) for d in bytearray(string, 'utf-8'))

	def key_hash(self):
		binary_key = self.binary_string(self.origin)
		return hashlib.sha256(binary_key.encode(encoding='UTF-8', errors='strict')).hexdigest()

	def encrypt_creds(self):

		data = (
			self.binary_string(self.username),
			self.binary_string(self.password)
		)
		recipient_key = RSA.import_key(open("receiver.pem").read())
		session_key = get_random_bytes(16)
		
		# Encrypt the session key with the public RSA key
		cipher_rsa = PKCS1_OAEP.new(recipient_key)
		enc_session_key = cipher_rsa.encrypt(session_key)

		# Encrypt the data with the AES session key
		cipher_aes = AES.new(session_key, AES.MODE_EAX)
		ciphertext, tag = cipher_aes.encrypt_and_digest(pickle.dumps(data))

		return (enc_session_key, cipher_aes.nonce, tag, ciphertext)


asd = Account('MS', 'afraz', '1234')
# print(asd.binary_string('afraz'))
asd.create()
# asd.search()