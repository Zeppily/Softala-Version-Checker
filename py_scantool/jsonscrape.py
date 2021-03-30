import urllib.request
import json
import re
import datetime

#TODO: Split logic

def scrap_eol():
    eolList = {"softwareList": []}

    JSON_URL = "https://spreadsheets.google.com/feeds/list/1sufF_TnsBvdVRQq8j77SsFr_0q_6yDtCkMAJWcM2kQ4/od6/public/basic?alt=json"


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

        if software and eol:
            try:
                eol_date = datetime.datetime.strptime(eol, "%m/%d/%Y").strftime("%Y-%m-%d")
                eolList["softwareList"].append({"software_name": re.sub(r'[^ A-Za-z0-9]', "", software.lower()), "version": version, "eol_date": eol_date })
            except:
                pass

    return eolList

