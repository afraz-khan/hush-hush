import json
from dotenv import load_dotenv, find_dotenv


class AppConfig:

	def __init__(self) -> None:
		load_dotenv(find_dotenv())

		f = open('config.json', 'r')
		self.data = json.load(f)
