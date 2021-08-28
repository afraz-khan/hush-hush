import base64
import hashlib
import os
import datetime
import jwt

class Auth:
	def __init__(self, username, password) -> None:
		self.username = username
		self.password = password
		self.salt = base64.b64decode(bytes(os.environ['PASS_SALT'], encoding='utf-8'))
		self.key = base64.b64decode(bytes(os.environ['PASS_KEY'], encoding='utf-8'))

	def authenticate(self):
		key = hashlib.pbkdf2_hmac(
			'sha256',
			self.password.encode('utf-8'), # Convert the password to bytes
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
		try:
			payload = {
				'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=30),
        'iat': datetime.datetime.utcnow(),
        'sub': os.environ['AUTH_JWT_SUB']
    	}
			return jwt.encode(
        payload,
        os.environ['AUTH_JWT_SECRET'],
        algorithm='HS256'
    )
		except Exception as e:
			return e
	
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
			raise jwt.InvalidTokenError
		except jwt.ExpiredSignatureError:
			return 'Signature expired. Please log in again.'
		except jwt.InvalidTokenError:
			return 'Invalid token. Please log in again.'
