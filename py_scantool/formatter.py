import re

def format_dpkg(commandResult):
	parts = re.split("\s+", commandResult)
	return {
		"depName": parts[1],
		"depVer": parts[2]
	}
