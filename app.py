from flask import Flask, request
import json
import os
from src.auth import Auth
from src.constant import Constant

os.environ['PASS_SALT'] = 'RK979adL70fiEiAb/hSDG3Ii1KDBafbEV5YorsUCnKM='
os.environ['PASS_KEY'] = 'd3cxyyCmNjqjhtcUhQ8U4yCjCS/pWo4u8nHM6Cxm05Y='
os.environ['CIPHER_SECRET'] = 'b2bn4coIJZUtlghYyuzf6b5x0sm8YLZzYXrGbPXOp_M='
os.environ['AUTH_JWT_SECRET'] = 'kIQgnGXnrMAL1UMGPNedMnzVNEVkALRSicEVDpon4CAaaYKVi+iNwreQ/xZGV93Oxss5J7zkhRzzOA9BkhRhSN1F2lS/cS18W4fef/Okli30B2xNFZ4LkPwL+mcDv+s54LcWYcZDEpsYuxn3WNmeDwsL8DlymdihMkETzSFeht/pyqzrWgi+3vLEYFJI1+xTuJjpSn01X55Gde6HHZsh+mA03fNlCzutHj16CeyalYw3Uh+OSAFt8HbkTlNII27S7QwUA89Iz+izz1ehpUL+aWlsWdc9kpK7sWStAwk+yXU0YaireLz6twOJeMYq1ToC+EIcZHpV4HIlhQ2wQcOaZQ=='
# os.environ['AUTH_JWT_SECRET'] = "\xe3!}'fl:$6\nT#\x13\xcd\x1e\xcf$\xd9\xfa\xa5\x14\x13\xaf\xf0"
os.environ['AUTH_JWT_SUB'] = 'a~22!ccc@4444#ddDdd$'

app = Flask(__name__)

@app.route("/auth", methods=['POST'])
def user_auth():
	
	status_code = 500
	try:
		data = json.loads(request.data)
		auth = Auth(data['master_text'])
		authResult = auth.authenticate()
		if authResult:
			return Constant.createResponse(200, auth.authenticate()), 200
		status_code = 401
		raise Exception('naah, act like a robot :)')
	except Exception as e:
		print('ERROR: ' , e)
		message = e.__str__()
		if status_code == 500:
			message = 'Seems like, demodogs are not happy.'
		return Constant.createResponse(status_code, message), status_code

@app.route("/auth/decode", methods=['POST'])
def jwt_decode():
	data = json.loads(request.data)
	return Auth.decode_auth_token(data['token'])
