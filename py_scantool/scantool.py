
import ssh_connect
import formatter
import re
	
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
		
		# Retrieve all installed software with version number
		results = ssh_connect.sshConnect(host, port, username, password, "dpkg -l | tail -n +6")
		
		# Retrieve manually installed software
		manualInstalled = ssh_connect.sshConnect(host, port, username, password, "apt-mark showmanual")

		# Format manually installed software into a list without new lines
		manualFormatted = formatter.formatManual(manualInstalled["result"])

		if not results["returnCode"]:
			depList.append(str(results["result"]))
		else:
			for result in results["result"]:
				formattedOutput = formatter.format_dpkg(str(result))
				streamlinedOutput = formatter.streamline(formattedOutput, manualFormatted)
				if streamlinedOutput:
					depList.append(streamlinedOutput)
		output = {"serverIp": serverInfo["host"], "depList": depList}
		softList.append(output)

	return softList

# Retrieve uptime from a server
def getUptime(serverList):
	uptimeList = []
	for serverInfo in serverList:
		scrapResults = ssh_connect.sshConnect(serverInfo["host"], serverInfo["port"], serverInfo["username"],
												serverInfo["password"], "uptime | awk '{print $3}'")

		if scrapResults["returnCode"]:
			trimmedResult = re.sub(r"[^0-9]", "", str(scrapResults["result"]))
			uptimeList.append({"host": serverInfo["host"], "uptime": trimmedResult})
		else:
			uptimeList.append({"host": serverInfo["host"], "uptime": "0"})
	
	return uptimeList
