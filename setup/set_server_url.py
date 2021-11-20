import json
import sys


server_url = sys.argv[1].strip('/')

f = open('config.json', 'r')
data = json.load(f)
f.close()

f = open('config.json', 'w')
data['cors']['origins'].append(server_url)
json.dump(data, f)
f.close()
