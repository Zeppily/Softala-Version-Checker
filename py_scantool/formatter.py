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
