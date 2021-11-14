import os
import sys
from cryptography.fernet import Fernet
from Crypto.PublicKey import RSA
sys.path.append(os.getcwd())
from src.validator import Validator
import secrets
import base64
import hashlib


def main():
	try:

		USERNAME = sys.argv[1]
		PASSWORD = sys.argv[2]
		if not Validator.password_check(PASSWORD):
			raise ValueError('Invalid Password: pl run the script again.')

		# 1. Generate a secret for the cipher text that keeps all encrypted credentials in it.
		cipher_secret = base64.b64encode(Fernet.generate_key())

		f = open('.env', 'w')
		f.write('HUSHHUSH_CIPHER_SECRET=')
		current_line_offset = f.tell()
		f.close()

		f = open('.env', 'ab')
		f.seek(current_line_offset)
		f.write(cipher_secret)
		f.close()


		# -------------------------------------------------------


		# 2. Set file name containing the cipher text.
		f = open('.env', 'a')
		f.write('\n')
		f.write('HUSHHUSH_CIPHER=hash.json')
		f.close()


		# -------------------------------------------------------


		# 3. Generate Salt & key for given password.
		salt = os.urandom(32)
		key = hashlib.pbkdf2_hmac('sha256', PASSWORD.encode('utf-8'), salt, 100000)
		storage = salt + key

		pass_salt = base64.b64encode(storage[:32])
		pass_key = base64.b64encode(storage[32:])

		f = open('.env', 'a')
		f.write('\n')
		f.write('HUSHHUSH_PASS_SALT=')
		current_line_offset = f.tell()
		f.close()

		f = open('.env', 'ab')
		f.seek(current_line_offset)
		f.write(pass_salt)
		f.close()

		f = open('.env', 'a')
		f.write('\n')
		f.write('HUSHHUSH_PASS_KEY=')
		current_line_offset = f.tell()
		f.close()

		f = open('.env', 'ab')
		f.seek(current_line_offset)
		f.write(pass_key)
		f.close()


		# --------------------------------------------------------


		# 4. Generate a secret that will be used to sign authentication JWT.
		auth_jwt_secret = secrets.token_urlsafe(100)

		f = open('.env', 'a')
		f.write('\n')
		f.write('HUSHHUSH_AUTH_JWT_SECRET=')
		current_line_offset = f.tell()
		f.close()

		f = open('.env', 'a')
		f.seek(current_line_offset)
		f.write(auth_jwt_secret)
		f.close()


		# --------------------------------------------------------


		# 5. Create USERNAME environment variable.
		f = open('.env', 'a')
		f.write('\n')
		f.write('HUSHHUSH_USERNAME=')
		current_line_offset = f.tell()
		f.close()

		f = open('.env', 'a')
		f.seek(current_line_offset)
		f.write(USERNAME)
		f.close()


		# --------------------------------------------------------


		# 6. Generate a unique value to be used for authentication JWT subject.
		auth_jwt_sub = secrets.token_urlsafe(30)

		f = open('.env', 'a')
		f.write('\n')
		f.write('HUSHHUSH_AUTH_JWT_SUB=')
		current_line_offset = f.tell()
		f.close()

		f = open('.env', 'a')
		f.seek(current_line_offset)
		f.write(auth_jwt_sub)
		f.close()

		# --------------------------------------------------------


		# 7. Generate RSA public/private keys that are used to encrypt credential objects.
		key = RSA.generate(2048)
		private_key = key.export_key()
		public_key = key.publickey().export_key()

		f = open('.env', 'a')
		f.write('\n')
		f.write('HUSHHUSH_PRIVATE_KEY="')
		current_line_offset = f.tell()
		f.close()

		f = open('.env', 'ab')
		f.seek(current_line_offset)
		f.write(private_key)
		current_line_offset = f.tell()
		f.close()

		f = open('.env', 'a')
		f.seek(current_line_offset)
		f.write('"\n')
		f.write('HUSHHUSH_PUBLIC_KEY="')
		current_line_offset = f.tell()
		f.close()

		f = open('.env', 'ab')
		f.seek(current_line_offset)
		f.write(public_key)
		current_line_offset = f.tell()
		f.close()

		f = open('.env', 'a')
		f.seek(current_line_offset)
		f.write('"')
		f.close()
		print(0)

	except ValueError:
		print(2)
	except:
		print(1)

if __name__ == "__main__":
    main()
