# Utilizing Python3 and Paramiko
# http://www.paramiko.org/installing.html
import paramiko

# TODO: Clean up exception handling
# Attempt a SSH connection with previous credentials and execute the given command
# If unsuccessful, catch error and output error message.

def sshConnect(host, port, username, password, command):
	try:
		ssh = paramiko.SSHClient()
		ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
		ssh.connect(host, port, username, password)

		stdin, stdout, stderr = ssh.exec_command(command)
		results = stdout.readlines()
		
	except paramiko.ssh_exception.AuthenticationException as error:
		return error
	except paramiko.ssh_exception.SSHException:
		results = stderr.readlines()
		return results


	return results
