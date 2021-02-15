import ssh_connect
import formatter

def main():
	##TODO: get the data from backend
	serverIps = ['0.0.0.0']
	userName = ''
	depList = []

	for serverIp in serverIps:

		host = serverIp
		port = "22"
		username = userName
		password = ""
		command = "dpkg -l | grep -e 'mariadb\|mysql\|postgresql\|python\|nodejs'"

		results = ssh_connect.sshConnect(host, port, username, password, command)

		if not results:
			print(results)
		else:
			for result in results:
				formattedOutput = formatter.format_dpkg(str(result))
				depList.append(formattedOutput)
		output = {"serverIp": serverIp, "depList": depList}
		##Post to API
		print(output)
main()
