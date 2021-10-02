import base64
import hashlib
import os
import datetime
import jwt
import uuid

class Auth:
	def __init__(self, username, master_secret) -> None:
		self.username = username
		self.master_secret = master_secret
		self.salt = base64.b64decode(bytes(os.environ['PASS_SALT'], encoding='utf-8'))
		self.key = base64.b64decode(bytes(os.environ['PASS_KEY'], encoding='utf-8'))

	def authenticate(self):
		key = hashlib.pbkdf2_hmac(
			'sha256',
			self.master_secret.encode('utf-8'), # Convert the master_secret to bytes
			self.salt,
			100000
		)
		if key == self.key and self.username == os.environ['USERNAME']:
			return self.__encode_auth_token()
		return False

	def __encode_auth_token(self):
		"""
    Generates the Auth Token
    :return: string
    """
		
		payload = {
				'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow(),
        'sub': os.environ['AUTH_JWT_SUB']
    	}
		return jwt.encode(
        payload,
        os.environ['AUTH_JWT_SECRET'],
        algorithm='HS256'
    	)
	
	@staticmethod
	def decode_auth_token(auth_token):
		"""
		Decodes the auth token
		:param auth_token:
    :return: integer|string
    """
		try:
			payload = jwt.decode(auth_token, os.environ['AUTH_JWT_SECRET'], algorithms='HS256')
			if(payload['sub'] == os.environ['AUTH_JWT_SUB']):
				return payload['sub']
		except jwt.ExpiredSignatureError:
			raise Exception('Signature expired. Please log in again.',{'code': 100})
		except jwt.InvalidTokenError:
			raise Exception('Invalid token. Please log in again.', {'code': 200})
