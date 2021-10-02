import re

class Validator:

	@staticmethod
	def validate_post_body(data):
		requiredFields = ['origin', 'username', 'password']
		print(data)
		if(type(data) == list):
			for account_obj in data:
				for field in requiredFields:
					if field in account_obj.keys():
						if re.search('^\s*$', account_obj[field]) is not None:	# check for empty strings
							return False
					else:
						return False
			return True
		return False
	
	@staticmethod
	def validate_update_body(data, allowedFields):
		if(all((k in allowedFields and re.search("^\s*$", data[k]) is None)
			for k in data.keys())):
			return True
		return False