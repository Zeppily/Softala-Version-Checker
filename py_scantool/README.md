# Flask App
![Python Tests](https://github.com/Zeppily/Softala-Version-Checker/actions/workflows/python-app.yml/badge.svg)

## Description

The python side of the application is a flask app which will simply SSH into 1 or more specified servers through a POST request.
The app can retrieve a list of all the installed software on linux host.

Filtering out most of the unwanted software we utilize "apt-mark showmanual" command to filter out most of the automatically installed softwares from the "dpkg -l" command.  

Furthermore, you can check the defined servers run times and retrieve a list of a 3rd party End of Life dates from their respective endpoints.

## Running the flask app outside of Docker:

1. Install dependencies
```
pip3 install --no-cache-dir -r requirements.txt
```
2.  Set Flask app
```
export FLASK_APP=api.py
```
3. Run Flask
```
python 3 -m flask run
```

## API RoadMap

| Feature              | Endpoint                   | Status          |
|----------------------|----------------------------|-----------------|
| Start Scan           | POST /start                | :white_check_mark: |
| Scrape EOL           | GET /eols                  | :white_check_mark: |
| Server uptime        | POST /uptime               | :white_check_mark: |

## Example Post Request to /start and /uptime:
```
{"credentials": [
    {
        "host": "0.0.0.0",
        "port": "22",
        "username": "username",
        "password": ""
    },
    {
        "host": "0.0.0.0",
        "port": "22",
        "username": "username",
        "password": ""
    }
]}
```

## Notes
- All the credentials and information in the POST requests are required. However password is nullable if you have ssh keys generated for the target servers on your machine or shared into the container.
