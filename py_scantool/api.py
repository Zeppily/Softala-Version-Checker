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


# /eols End-point that only accepts GET requests
# Starts the json scrapper and returns the software list
@app.route('/eols', methods=['GET'])
def get_eol():
    return jsonscrape.scrap_eol()