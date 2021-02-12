import re


def parse_line(line):
    parts = re.split("\s+", line)
    return {
        "depName": parts[1],
        "depVer": parts[2]
    }
