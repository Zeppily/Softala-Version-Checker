import urllib.request
import json
import re

with urllib.request.urlopen("https://spreadsheets.google.com/feeds/list/1sufF_TnsBvdVRQq8j77SsFr_0q_6yDtCkMAJWcM2kQ4/od6/public/basic?alt=json") as url:
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

    print(f"software = {software}, version = {version}, eol = {eol}")
