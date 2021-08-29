from flask import Flask, request
import json
import os

import flask
from src.auth import Auth
from src.account import Account
from src.constant import Constant
from flask_cors import CORS

os.environ['CIPHER_SECRET'] = 'TXN2TE15aWZpb0l0NFZSRjM4MEMwRHNxTXY2QmF6UDdqRjhoMC1VZDhrUT0='
os.environ['CIPHER'] = 'hash.json'
os.environ['PASS_SALT'] = '43QBXV6rRi2IXE7Vg9EIPhcsWa66zSJnyIEbjQxPoZA='
os.environ['PASS_KEY'] = '6TTCP6o2HjGuWsdOgrB93oAFfe9eajl+WOrLPGVxIw0='
os.environ['AUTH_JWT_SECRET'] = 'kIQgnGXnrMAL1UMGPNedMnzVNEVkALRSicEVDpon4CAaaYKVi+iNwreQ/xZGV93Oxss5J7zkhRzzOA9BkhRhSN1F2lS/cS18W4fef/Okli30B2xNFZ4LkPwL+mcDv+s54LcWYcZDEpsYuxn3WNmeDwsL8DlymdihMkETzSFeht/pyqzrWgi+3vLEYFJI1+xTuJjpSn01X55Gde6HHZsh+mA03fNlCzutHj16CeyalYw3Uh+OSAFt8HbkTlNII27S7QwUA89Iz+izz1ehpUL+aWlsWdc9kpK7sWStAwk+yXU0YaireLz6twOJeMYq1ToC+EIcZHpV4HIlhQ2wQcOaZQ=='
os.environ['USERNAME'] = 'afrazkhan'

app = Flask(__name__)
CORS(app)

@app.before_request
def request_authorizer():
	try:
		if(request.path != '/auth'):
			Auth.decode_auth_token(request.headers['Authorization'])
	except Exception as e:
		print('ERROR', e)
		return 'invalid_request', 403

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

@app.route('/accounts', methods=['POST'])
def add_account():
	status_code = 500
	message = ''
	try:
		data = json.loads(request.data)
		requiredFields = ['origin', 'username', 'password']
		accont = Account()
		if(all(k in data.keys() for k in requiredFields)):
			accont.create(data['origin'], data['username'], data['password'])
			status_code = 200
			message = 'success'
		else:
			status_code = 400
			message = 'invalid body'
		return Constant.createResponse(status_code, message), status_code
	except Exception as e:
		print('ERROR: ' , e)
		message = e.__str__()
		if status_code == 500:
			message = 'Seems like, demodogs are not happy 🥲.'
		return Constant.createResponse(status_code, message), status_code

@app.route('/accounts/<origin>', methods=['GET'])
def get_account(origin):
	status_code = 500
	try:
		accont = Account()
		data = accont.findOneByOrigin(origin)
		return Constant.createResponse(200, 'success', data), 200
	except KeyError as e:
		return Constant.createResponse(404, e.__str__()), 404
	except Exception as e:
		print('ERROR: ' , e)
		message = e.__str__()
		if status_code == 500:
			message = 'Seems like, demodogs are not happy 🥲.'
		return Constant.createResponse(status_code, message), status_code

@app.route("/auth/test", methods=['POST'])
def test():
	return {
		'data': 'helloe'
	}
