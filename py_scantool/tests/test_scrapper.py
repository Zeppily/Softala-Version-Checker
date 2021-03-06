import jsonscrape

# Scraps software from EOL JSON file
# Expected: software list containing information about python
def test_jsonscrap():
    result = jsonscrape.scrap_eol()["softwareList"]

    line_to_compare = list(filter(lambda software: software['software_name'] == 'python', result))[0]
    assert len(result) > 0
    assert ("python" == line_to_compare["software_name"])
    