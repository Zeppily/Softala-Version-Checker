import pytest
import json
from api import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_get_request_should_not_be_allowed(client):
    response = client.get("http://127.0.0.1:5000/start/")
    assert b"405 Method Not Allowed" in response.data


def test_empty_post_request_should_give_error(client):
    response = client.post("http://127.0.0.1:5000/start/", data="")
    assert b"bad request!" in response.data