
import ssh_connect
import formatter
	
# TODO: Assemble command here instead of back-end.
# TODO: Make the command dynamic and assembled logically here.

# Attempts SSH connections through ssh_connect with given credentials and execute the dpkg command.
# If ssh connection succesfull, calls formatter function.
# For each server create a dictionary with the host info and the software as a list.
# Return all server software as an array containing dictionaries.
def ssh_scrap(serverList):

	softList = []
	for serverInfo in serverList:
		depList = []
		host = serverInfo["host"]
		port = serverInfo["port"]
		username = serverInfo["username"]
		password = serverInfo["password"]
		# command = serverInfo["command"]
		command = "dpkg -l | grep -e 'mariadb\|mysql\|postgresql\|python\|nodejs'"

		results = ssh_connect.sshConnect(host, port, username, password, command)

		if not results["returnCode"]:
			depList.append(str(results["result"]))
		else:
			for result in results["result"]:
				formattedOutput = formatter.format_dpkg(str(result))
				depList.append(formattedOutput)
		output = {"serverIp": serverInfo["host"], "depList": depList}
		softList.append(output)

	return softList
