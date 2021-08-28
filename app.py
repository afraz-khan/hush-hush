from flask import Flask, request
import json
import os

import flask
from src.auth import Auth
from src.constant import Constant
from flask_cors import CORS

os.environ['PASS_SALT'] = '43QBXV6rRi2IXE7Vg9EIPhcsWa66zSJnyIEbjQxPoZA='
os.environ['PASS_KEY'] = '6TTCP6o2HjGuWsdOgrB93oAFfe9eajl+WOrLPGVxIw0='
os.environ['CIPHER_SECRET'] = 'b2bn4coIJZUtlghYyuzf6b5x0sm8YLZzYXrGbPXOp_M='
os.environ['AUTH_JWT_SECRET'] = 'kIQgnGXnrMAL1UMGPNedMnzVNEVkALRSicEVDpon4CAaaYKVi+iNwreQ/xZGV93Oxss5J7zkhRzzOA9BkhRhSN1F2lS/cS18W4fef/Okli30B2xNFZ4LkPwL+mcDv+s54LcWYcZDEpsYuxn3WNmeDwsL8DlymdihMkETzSFeht/pyqzrWgi+3vLEYFJI1+xTuJjpSn01X55Gde6HHZsh+mA03fNlCzutHj16CeyalYw3Uh+OSAFt8HbkTlNII27S7QwUA89Iz+izz1ehpUL+aWlsWdc9kpK7sWStAwk+yXU0YaireLz6twOJeMYq1ToC+EIcZHpV4HIlhQ2wQcOaZQ=='
os.environ['AUTH_JWT_SUB'] = 'a~22!ccc@4444#ddDdd$'
os.environ['USERNAME'] = 'afrazkhan'

app = Flask(__name__)
CORS(app)

@app.before_request
def request_authorizer():
	if(request.path != '/auth'):
		

@app.route("/auth", methods=['POST'])
def user_auth():
	
	status_code = 500
	try:
		data = json.loads(request.data)
		auth = Auth(data['username'], data['master_secret'])
		authResult = auth.authenticate()
		if authResult:
			resp = flask.Response(json.dumps(Constant.createResponse(200, 'success')))
			resp.headers['Authorization'] = authResult
			return resp, 200
		status_code = 401
		raise Exception("I don't know you, acting like a robot? 🤔")
	except Exception as e:
		print('ERROR: ' , e)
		message = e.__str__()
		if status_code == 500:
			message = 'Seems like, demodogs are not happy 🥲.'
		return Constant.createResponse(status_code, message), status_code

@app.route('/account', methods=['POST'])
def add_account():
	status_code = 500
	try:
		data = json.loads(request.data)
		data = Auth(data['username'], data['master_secret'])
		authResult = auth.authenticate()
		if authResult:
			resp = flask.Response(json.dumps(Constant.createResponse(200, 'success')))
			resp.headers['Authorization'] = authResult
			return resp, 200
		status_code = 401
		raise Exception("I don't know you, acting like a robot? 🤔")
	except Exception as e:
		print('ERROR: ' , e)
		message = e.__str__()
		if status_code == 500:
			message = 'Seems like, demodogs are not happy 🥲.'
		return Constant.createResponse(status_code, message), status_code

@app.route("/auth/decode", methods=['POST'])
def jwt_decode():
	data = json.loads(request.data)
	return Auth.decode_auth_token(data['token'])
