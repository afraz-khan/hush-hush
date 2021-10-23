import re


class Validator:

	@staticmethod
	def validate_post_body(data):
		required_fields = ['origin', 'username', 'password']

		if type(data) == list:
			for account_obj in data:
				for field in required_fields:
					if field in account_obj.keys():
						if re.search(r'^\s*$', account_obj[field]) is not None:  # check for empty strings
							return False
					else:
						return False
			return True
		return False
	
	@staticmethod
	def validate_update_body(data, allowed_fields):
		if all((k in allowed_fields and re.search(r'^\s*$', data[k]) is None) for k in data.keys()):
			return True
		return False
