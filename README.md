# Softala-Version-Checker Project Spring 2021

[![React App CI](https://github.com/Zeppily/Softala-Version-Checker/actions/workflows/reactapp.js.yml/badge.svg)](https://github.com/Zeppily/Softala-Version-Checker/actions/workflows/reactapp.js.yml)  
[![Node.js CI](https://github.com/Zeppily/Softala-Version-Checker/actions/workflows/node.js.yml/badge.svg)](https://github.com/Zeppily/Softala-Version-Checker/actions/workflows/node.js.yml)  
[![Install and test py_scantool](https://github.com/Zeppily/Softala-Version-Checker/actions/workflows/python-app.yml/badge.svg)](https://github.com/Zeppily/Softala-Version-Checker/actions/workflows/python-app.yml)  

##  Project Members
[lennikorhonen](https://github.com/lennikorhonen)  
[Simon](https://github.com/Bgh237)  
[Pess1](https://github.com/Pess1)  
[KasperToikkanen](https://github.com/KasperToikkanen)  
[Nipeh](https://github.com/NipeH)  
[Geoffrey](https://github.com/Zeppily)  
[Teemu](https://github.com/swd1tn002)  

## Credit
The EOLs are from an open source third party which provides the information about software versions and their end of life dates.  
https://www.upcomingeol.com/more-data

## Description  

Version Checker is a full stack solution that will SSH to specified SSH servers to check locally installed softwares their version.  
It will compare the installed software and run it against a 3rd party EOL list to give you the following results:  
- EOL Approaching  
- Updatable  
- Unsupported count
- Total counts

## Slack Bot

When conducting a scan the back end can post the results of the scan in a designated slack channel through the webhook.  
The slack url should be specified in the backend.env.  
See: https://slack.com/intl/en-fi/help/articles/115005265063-Incoming-webhooks-for-Slack

## Scheduler

Currently there is a scheduler to automate the process on a desired time.  
This feature is currently hard coded and can be modified in the code.  
See Softala-Version-Checker/Backend/api/index.js 

## Running the application ( Docker)
1. Clone Repo  
```
git clone https://github.com/Zeppily/Softala-Version-Checker.git
```
2. Go to project root folder
```
cd Softwala-Version-Checker/
```
4. Create .env files in root directory for your desired credentials  
You can modify the template files to your requirements and rename them approperiately.
```
database.env should contain:
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<database-name>

backend.env should contain:
DB_USER=<username>
DB_PSWD=<password>
DB_URL=database
PY_URL=py_app
SLACK_URL=<webhookURL>

Change config.json to server ip/hostname where the stack is posted  
@ Frontend/version-checker-frontend/src/config.json
```
6. Run Docker Compose
```
docker-compose up -d
```  
7. Migrate the database on first project run  
```
docker exec backend
npx sequelize-cli db:migrate
```
9. Go to your browser localhost:3000  
  
(* Docker compose: https://docs.docker.com/compose/install/)
## Notes
- Passwords are optionally stored, you can create SSH keys for the target servers on the server hosting the stack beforehand.  
- Make sure SSH keys generated are not specified to a user.
- In the front-end dates are entered YYYY-MM-DD

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.
