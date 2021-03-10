import re

# TODO: Convert to more agile solution for various commands (DKPG, APT)
# TODO: Flexible for bulk input (multiple lines)

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
	print(manualFormatted)
	print(data)
	for installed in manualFormatted:
		if data["depName"] == installed:
			usefulDepName = data["depName"]
			streamlinedVersion = str(re.split(r'[^0-9.-]', data["depVer"])[0])
			return {
				"depName": usefulDepName,
				"depVer": streamlinedVersion
			}