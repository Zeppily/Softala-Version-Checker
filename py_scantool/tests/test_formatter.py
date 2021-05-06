import formatter

# Input: Example Line From dpkg Command
# Expected: Dictionary containing the relevant information
def test_format_dkpg_creates_depedency_object_from_dpkg_string():
    line_to_test = "ii  python3                                    3.8.2-0ubuntu2                      amd64        interactive high-level object-oriented language (default python3 version)"
    result = formatter.format_dpkg(line_to_test)

    assert result['depName'] == "python3"
    assert result['depVer'] == "3.8.2-0ubuntu2"

# Input: Example Array from apt-mark showmanual command containing all manually installed software
# Expected: Array list with all whitespace and new lines removed from string objects
def test_manual_formatting_removes_whitespace():
    line_to_test = ['nano\n', 'nginx\n', 'nodejs\n', 'openssh-client\n']
    result =formatter.formatManual(line_to_test)

    assert len(result) == 4
    assert result[1] == "nginx"

# Input: Example formatted object retrieved from dpkg command
# Expected: Trailing infromation on depVer is removed
def test_streamline_removes_trailing_non_version_information_from_dependencies():
    line_to_test = {
        'depName': 'python3',
        'depVer': '3.8.2-0ubuntu2'
    }

    result = formatter.streamline(line_to_test, ["python3", "ruby"])

    assert result['depName'] == "python3"
    assert result['depVer'] == "3.8.2-0"

# Input: Example formatted object retrieved from dpkg command
# Expected: Heading infromation on depVer is removed
def test_streamline_removes_heading_non_version_information_from_dependencies():
    line_to_test = {
        'depName': 'ruby',
        'depVer': '8:2.5'
    }

    result = formatter.streamline(line_to_test, ["python3", "ruby"])

    assert result['depName'] == "ruby"
    assert result['depVer'] == "2.5"