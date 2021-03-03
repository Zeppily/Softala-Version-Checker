# Utilizing Flask to create API end Points
# Installation: https://flask.palletsprojects.com/en/1.1.x/installation/#install-flask
# Quickstart: https://flask.palletsprojects.com/en/1.1.x/quickstart/#a-minimal-application
from flask import Flask
from flask import request
import scantool
import json
import jsonscrape

app = Flask(__name__)

# /start/ End-point that only accepts POST requests
# The server credentials list get retrieved from the request and handed to the scantool function
# returns the dictioary from the scantool output as a JSON Array
@app.route('/start/', methods=['POST'])
def start_scan():
    request_data = request.get_json()
    if(request_data):
        output = scantool.ssh_scrap(request_data["credentials"])
        return json.dumps(output)
    else:
        return 'bad request!', 400

# Example Post Request:
# Must include credentials list, even for 1 server object.
#{"credentials": [
#    {
#        "host": "0.0.0.0",
#        "port": "22",
#        "username": "username",
#        "password": ""
#    },
#    {
#        "host": "0.0.0.0",
#        "port": "22",
#        "username": "username",
#        "password": ""
#    },
#    {
#        "host": "0.0.0.0",
#        "port": "22",
#        "username": "username",
#        "password": ""
#    }
#]}

# /eols End-point that only accepts GET requests
# Starts the json scrapper and returns the software list
@app.route('/eols', methods=['GET'])
def get_eol():
    return jsonscrape.scrap_eol()