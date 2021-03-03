import urllib.request
import json
import re
import datetime

def scrap_eol():
    eolList = {"softwareList": []}

    JSON_URL = "https://spreadsheets.google.com/feeds/list/1sufF_TnsBvdVRQq8j77SsFr_0q_6yDtCkMAJWcM2kQ4/od6/public/basic?alt=json"
    date = datetime.datetime.now()
    str_date = str(date.month) + "/" + str(date.day) + "/" + str(date.year)

    software_list = ["MySQL Database", "PostgreSQL",
                    "Node.js", "Python", "Ruby", "Debian Linux", "Ubuntu", "npm"]

    with urllib.request.urlopen(JSON_URL) as url:
        data = json.loads(url.read().decode())


    c = data['feed']['entry']
    for d in c:
        text = d['content']['$t']

        s = re.search('software: (.+?),', text)
        v = re.search('version: (.+?),', text)
        e = re.search('eoldate: (.+?),', text)

        if s:
            software = s.group(1)
        if v:
            version = v.group(1)
        if e:
            eol = e.group(1)

        if software in software_list and eol[-2:] >= str_date[-2:]:
            eolList["softwareList"].append({"software_name": software, "version": version, "eol_date": eol })
        else:
            pass

    return eolList
