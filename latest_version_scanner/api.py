from flask import Flask
from flask import request
import json
import re
from subprocess import run, PIPE, check_output


app = Flask(__name__)


@app.route('/version/', methods=['POST'])
def version_scan():
    softwares = request.get_json()
    software_list = list(softwares['software_list'])
    version_info = []
    for item in software_list:

        output = str(check_output(
            ['apt-cache', 'policy', item]).decode("utf-8"))

        match = re.search(r'Candidate: (\S+)', output)
        version = str(re.split(r'[^0-9.-]', match.group(1))[0])
        if (match):
            formatted_response = {"name": item,
                                  "latest_version": version}
            version_info.append(formatted_response)

    return json.dumps(version_info)
