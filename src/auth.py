import base64
import hashlib
import os

class Auth:
	def __init__(self, password) -> None:
		self.password = password
		self.salt = base64.b64decode(bytes(os.environ['pass_salt'], encoding='utf-8'))
		self.key = base64.b64decode(bytes(os.environ['pass_key'], encoding='utf-8'))

	def authenticate(self):
		key = hashlib.pbkdf2_hmac(
			'sha256',
			self.password.encode('utf-8'), # Convert the password to bytes
			self.salt,
			100000
		)
		print(self.salt, key, self.key)
		if key == self.key:
			return True
		return False
