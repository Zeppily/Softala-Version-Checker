import jsonscrape

def test_jsonscrap():
    result = jsonscrape.scrap_eol()["softwareList"]

    line_to_compare = list(filter(lambda software: software['software_name'] == 'Python', result))[0]
    assert len(result) > 0
    assert ("Python" == line_to_compare["software_name"])
    