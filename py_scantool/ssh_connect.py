import paramiko

def sshConnect(host, port, username, password, command):
	try:
		ssh = paramiko.SSHClient()
		ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
		ssh.connect(host, port, username, password)

		stdin, stdout, stderr = ssh.exec_command(command)
		results = stdout.readlines()

	except paramiko.ssh_exception.SSHException:
		results = stderr.readlines()
		return results

	return results
