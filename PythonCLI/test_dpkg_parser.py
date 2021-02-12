import dpkg_parser


def test_parsing_python():
    line_to_test = "ii  python3                                    3.8.2-0ubuntu2                      amd64        interactive high-level object-oriented language (default python3 version)"
    result = dpkg_parser.parse_line(line_to_test)

    assert result['depName'] == "python3"
    assert result['depVer'] == "3.8.2-0ubuntu2"
