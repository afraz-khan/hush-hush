import base64
from cryptography.fernet import Fernet
import os
import json
import pickle

os.environ['secret'] = 'TXN2TE15aWZpb0l0NFZSRjM4MEMwRHNxTXY2QmF6UDdqRjhoMC1VZDhrUT0='

class Account:
	def __init__(self, username, password) -> None:
			self.username = username
			self.password = password
			self.secret = base64.b64decode(bytes(os.environ['secret'], encoding='utf-8'))
			self.fernet = Fernet(self.secret)
	
	def create(self):
		accounts = {}
		hash_data = None

		if os.stat('hash.json').st_size > 0:
			f0 = open('hash.json', 'rb')
			hash_data = f0.read()
			accounts = json.loads(self.fernet.decrypt(hash_data))
			f0.close()
		accounts[self.binary_string(self.username)]= self.binary_string(self.password)
		
		encrypted = self.fernet.encrypt(json.dumps(accounts, indent=2).encode('utf-8'))
		
		f = open('hash.json','wb')
		hash_data = f.write(encrypted)
		f.close()
	
	def search(self):
		f = open('hash.json','rb')
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


asd = Account('Tee', 'ASK')
# print(asd.binary_string('afraz'))
asd.create()
# asd.search()