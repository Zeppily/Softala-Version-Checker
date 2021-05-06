import ssh_connect
import os
import pytest
import paramiko
from dotenv import load_dotenv

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


def test_ssh_connection_fails_with_invalid_login():
    output = ssh_connect.sshConnect(IP_ADDRESS, PORT, 'IAmMuchMoreHumble', 'Iam', command)
    assert str(output["result"]) == "Authentication failed."



