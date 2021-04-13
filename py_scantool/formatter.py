import re


# Splits the columns from the output
# Returns the dependency name and info columns as a dictionary
def format_dpkg(commandResult):
	parts = re.split(r"\s+", commandResult)
	return {
		"depName": parts[1],
		"depVer": parts[2]
	}


def formatManual(manualInstalled):
	manualFormatted = []
	for installed in manualInstalled:
		formatted = re.sub(r"\n+", "", installed)
		manualFormatted.append(formatted)
	return manualFormatted
	

def streamline(data, manualFormatted):
	for installed in manualFormatted:
		if data["depName"] == installed:
			usefulDepName = data["depName"]
			depVer = data["depVer"]

			if data["depVer"].find(":") == 1:
				depVer = str(re.sub(r'^[^:\r\n]+:*', "", data["depVer"]))

			streamlinedVersion = str(re.split(r'[^0-9.-]', depVer)[0])

			print(usefulDepName + ' ' + streamlinedVersion)
			return {
				"depName": usefulDepName,
				"depVer": streamlinedVersion
			}

