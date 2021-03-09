import ssh_connect
import os
import pytest
import paramiko
from dotenv import load_dotenv

# TODO: Change command once implemented in scantool.py and ssh_connect.py

load_dotenv()
USERNAME= os.getenv('USERNAME')
IP_ADDRESS= os.getenv('IP_ADDRESS')
IP_LIST= os.getenv('IP_LIST')
PASSWORD= os.getenv('PASSWORD')
PORT= os.getenv('PORT')
command = "whoami"

def test_ssh_connection_succeeds_with_valid_credentials():
    output = ssh_connect.sshConnect(IP_ADDRESS, PORT, USERNAME, PASSWORD, command)
    assert str.rstrip(output['result'][0]) == USERNAME

#def test_ssh_connection_fails_with_invalid_host():
##    with pytest.raises(paramiko.ssh_exception.NoValidConnectionsError):
#    output = ssh_connect.sshConnect('127.0.0.1', PORT, USERNAME, PASSWORD, command)
#    assert str(output["result"]) == '[Errno None] Unable to connect to port 22 on 127.0.0.1'

def test_ssh_connection_fails_with_invalid_login():
    output = ssh_connect.sshConnect(IP_ADDRESS, PORT, 'IAmMuchMoreHumble', 'Iam', command)
    assert str(output["result"]) == "Authentication failed."



