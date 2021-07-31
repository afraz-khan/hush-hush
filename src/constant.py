class Constant:
	
	@staticmethod
	def createResponse(status_code=500, message='', *args):
		resp = {
			'message': message,
			'status_code': status_code
		}
		for index, arg  in enumerate(args):
			if index == 0:
				resp['data'] = arg
		return resp