import pytest
import scantool
import os
from dotenv import load_dotenv

load_dotenv()
USERNAME= os.getenv('USERNAME')
IP_ADDRESS= os.getenv('IP_ADDRESS')
PASSWORD= os.getenv('PASSWORD')
PORT= os.getenv('PORT')

# Input: Arraylist of objects containing server information
# Expected: uptime attribute is a string convertable with a number bigger than 0 representing days
def test_getuptime_retrieves_the_uptime_from_a_server():
    serverCredentialList = [{
        'host': IP_ADDRESS,
        'port': PORT,
        'username': USERNAME,
        'password': PASSWORD,
    }]

    result = scantool.getUptime(serverCredentialList)

    assert result[0]['host'] == IP_ADDRESS
    assert int(result[0]['uptime']) > 0


# Input: Arraylist of objects containing wrong server information
# Expected: offline server or failed authentication will give uptime 0
def test_getuptime_with_wrong_credentials_gives_uptime_0():
    serverCredentialList = [{
        'host': IP_ADDRESS,
        'port': PORT,
        'username': 'Oh_billy',
        'password': PASSWORD,
    }]

    result = scantool.getUptime(serverCredentialList)

    assert result[0]['host'] == IP_ADDRESS
    assert int(result[0]['uptime']) == 0