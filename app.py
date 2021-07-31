from flask import Flask, request
import json
import os
from src.auth import Auth
from src.constant import Constant

os.environ['pass_salt'] = 'RK979adL70fiEiAb/hSDG3Ii1KDBafbEV5YorsUCnKM='
os.environ['pass_key'] = 'd3cxyyCmNjqjhtcUhQ8U4yCjCS/pWo4u8nHM6Cxm05Y='

app = Flask(__name__)

@app.route("/auth", methods=['POST'])
def user_auth():
	
	status_code = 500
	try:
		data = json.loads(request.data)
		auth = Auth(data['password'])
		if auth.authenticate():
			return Constant.createResponse(200, 'aaah, you are not robot.'), 200
		status_code = 401
		raise Exception('naah, act like a robot :)')
	except Exception as e:
		print('ERROR: ' , e)
		message = e.__str__()
		if status_code == 500:
			message = 'Seems like, demodogs are not happy.'
		return Constant.createResponse(status_code, message), status_code
