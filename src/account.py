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
			self.fernet  = Fernet(base64.b64decode(bytes(os.environ['secret'], encoding='utf-8')))
			if os.stat(os.environ['cipher']).st_size > 0:
				f = open(os.environ['cipher'], 'rb')
				hash_data = f.read()
				self.cipher = pickle.loads(self.fernet.decrypt(hash_data))
				f.close()
			else:
				self.cipher = {}
	
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
		print(self.cipher[origin_hash])
	def binary_string(self, string):
		return ' '.join('{:08b}'.format(d) for d in bytearray(string, 'utf-8'))

	def key_hash(self, string):
		binary_key = self.binary_string(string)[::-1] # reverse the binary string
		return hashlib.sha256(binary_key.encode(encoding='UTF-8', errors='strict')).hexdigest()

	def encrypt_creds(self, username, password):

		data = [
			self.binary_string(self.username)[::-1],
			self.binary_string(self.password)[::-1]
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


asd = Account()
# print(asd.binary_string('afraz'))
# asd.create()
asd.search('MS')