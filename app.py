from flask import Flask, request
import json
import os

import flask
from src.auth import Auth
from src.account import Account
from src.constant import Constant
from src.validator import Validator
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='client/build', static_url_path='/')
CORS(app, origins=['hush-hush-demo.herokuapp.com', 'code.jquery.com', 'stackpath.bootstrapcdn.com',
					'cdnjs.cloudflare.com'], methods=['POST', 'PUT', 'GET', 'DELETE'],
					allow_headers=['Authorization'])


@app.before_request
def request_authorizer():
	f = open('config.json', 'r')
	non_auth_paths = json.load(f)['non_auth_paths']

	try:
		if request.path not in non_auth_paths and request.path.startswith('/static/') is False:
			Auth.decode_auth_token(request.headers['Authorization'])
	except Exception as e:
		print('ERROR', e)
		if len(e.args) > 1 and e.args[1]['code']:
			return Constant.create_response(403, e.args[0]), 403
		return Constant.create_response(500, 'Seems like, demodogs are not happy 🥲.'), 500


@app.route('/')
def index():
	return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found():
	return app.send_static_file('index.html')


@app.route("/auth", methods=['POST'])
def user_auth():
	status_code = 500
	try:
		data = json.loads(request.data)
		auth = Auth(data['username'], data['master_secret'])
		auth_result = auth.authenticate()
		if auth_result:
			resp = flask.Response(json.dumps(Constant.create_response(200, 'success')))
			resp.headers['Authorization'] = auth_result
			return resp, 200
		status_code = 401
		raise Exception("I don't know you, acting like a robot? 🤔")
	except Exception as e:
		print('ERROR: ', e)
		message = e.__str__()
		if status_code == 500:
			message = 'Seems like, demodogs are not happy 🥲.'
		return Constant.create_response(status_code, message), status_code


@app.route('/accounts', methods=['POST'])
def add_account():
	status_code = 500
	try:
		data = json.loads(request.data)
		if Validator.validate_post_body(data):
			account = Account()
			lookup_result = account.bulk_lookup(data)
			
			if lookup_result is None:
				account.bulk_create(data)
				return Constant.create_response(200, 'success'), 200
			status_code = 409
			raise Exception('Origin "{}" already exists.'.format(lookup_result['origin']))

		status_code = 400
		raise Exception('invalid body')
	except Exception as e:
		print('ERROR: ', e)
		message = e.__str__()
		if status_code == 500:
			message = 'Seems like, demodogs are not happy 🥲.'
		return Constant.create_response(status_code, message), status_code


@app.route('/accounts/<origin>', methods=['GET'])
def get_account(origin):
	status_code = 500
	try:
		account = Account()
		data = account.find_one_by_origin(origin)
		if data:
			return Constant.create_response(200, 'success', data), 200
		status_code = 404
		raise Exception('origin not found.')
	except Exception as e:
		print('ERROR: ', e)
		message = e.__str__()
		if status_code == 500:
			message = 'Seems like, demodogs are not happy 🥲.'
		return Constant.create_response(status_code, message), status_code


@app.route('/accounts', methods=['GET'])
def search_accounts():
	status_code = 500
	try:
		account = Account()
		if 'origin' in request.args.keys():
			data = account.search(request.args['origin'].strip())
		else:
			data = account.search()
		return Constant.create_response(200, 'success', data), 200
	except Exception as e:
		print('ERROR: ', e)
		message = e.__str__()
		if status_code == 500:
			message = 'Seems like, demodogs are not happy 🥲.'
		return Constant.create_response(status_code, message), status_code


@app.route('/accounts/<origin>', methods=['PUT'])
def update_account(origin):
	status_code = 500
	try:
		data = json.loads(request.data)
		allowed_fields = ['username', 'password']
		account = Account()
		if Validator.validate_update_body(data, allowed_fields):
			is_updated = account.update_account(origin, data)
			if is_updated:
				return Constant.create_response(200, 'success'), 200
			status_code = 404
			raise Exception('Origin not found.')
		status_code = 400
		raise Exception('invalid_request')
	except Exception as e:
		print('ERROR: ', e)
		message = e.__str__()
		if status_code == 500:
			message = 'Seems like, demodogs are not happy 🥲.'
		return Constant.create_response(status_code, message), status_code


@app.route('/accounts/<origin>', methods=['DELETE'])
def delete_account(origin):
	status_code = 500
	try:
		account = Account()
		is_deleted = account.delete_account(origin)
		if is_deleted:
			return Constant.create_response(200, 'success'), 200
		status_code = 404
		raise Exception('origin not found.')
	except Exception as e:
		print('ERROR: ', e)
		message = e.__str__()
		if status_code == 500:
			message = 'Seems like, demodogs are not happy 🥲.'
		return Constant.create_response(status_code, message), status_code


if __name__ == "__main__":
	app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
