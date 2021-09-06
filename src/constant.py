class Constant:
	
	@staticmethod
	def create_response(status_code=500, message='', *args):
		resp = {
			'message': message,
			'status_code': status_code
		}
		for index, arg  in enumerate(args):
			if index == 0:
				resp['data'] = arg
		return resp

	@staticmethod
	def error_codes():
		return {
			'EXPIERD_TOKEN': 100,
			'INVALID_TOKEN': 200
		}