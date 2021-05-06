[![Node.js CI](https://github.com/Zeppily/Softala-Version-Checker/actions/workflows/node.js.yml/badge.svg)](https://github.com/Zeppily/Softala-Version-Checker/actions/workflows/node.js.yml)

# Backend get started

In terminal:

```
npm init // type after clone / pull
```

```
cd Backend //go to "Backend"
```

```
npm start // run backend in node.js
```

Folder structure explained below

## api

- Index.js which is the root file
- server folder (explained below)

## server

- controller folder. Containers the controller files for each element of the project. Call the services from here.
- routes folder. Defines the routes for each service.
- services folder. Contains the files that hold the code that interacts with the database directly.
- src folder (explained below).
- utils folder. Holds the file that defines our return object when api is called.

## src

- config folder. Holds the file which holds database connection details.
- migrations folder. Holds the files that define how the database structure is migrated from the code to the live databases. Migration files generated from models files by sequelize.
- models folder. Holds the files that define the database tables and relations.

## Request URLs and data structure for POST/PUT requests

### - Project Info

- GET request for all project details

```
<YOUR_URL>/api/projects/
```

- POST request to add a new project

```
<YOUR_URL>/api/projects/
Data structure in POST request:
{
    "host": "<your_project_url_or_ip>",
    "name": "<your_project_name>",
    "username": "<your_username>"
}
```

- PUT request to update a project

```
<YOUR_URL>/api/projects/<your_project_name>
Data structure in PUT request:
{
    "host": "<your_project_url_or_ip>",
    "name": "<your_project_name>",
    "username": "<your_username>"
}
```

- DELETE request to delete a project

```
<YOUR_URL>/api/projects/<your_project_name>
```

### - EOL Info

- GET request for all EOL details

```
<YOUR_URL>/api/eols/
```

- GET request for all EOLs for a specific project

```
<YOUR_URL>/api/eols/<your_project_name>
```

- POST request to add a new EOL

```
<YOUR_URL>/api/eols/
Data structure in POST request:
{
    "software_name": "<software_name>",
    "version": "<version_number>",
    "eol_date": "<eol_date_YYYY-MM-DD>"
}
```

- POST request to add a list of new EOL

```
<YOUR_URL>/api/eols/list
Data structure in POST request:
[
    {
        "software_name": "<software_name>",
        "version": "<version_number>",
        "eol_date": "<eol_date_YYYY-MM-DD>"
    },
    {
        "software_name": "<software_name>",
        "version": "<version_number>",
        "eol_date": "<eol_date_YYYY-MM-DD>"
    }
]
```

- PUT request to update a project

```
<YOUR_URL>/api/eols/
Data structure in PUT request:
{
    "host": "<your_project_url_or_ip>",
    "name": "<your_project_name>",
    "username": "<your_username>"
}
```

- DELETE request to delete an EOL

```
<YOUR_URL>/api/eols
```

- DELETE request to delete all EOLs

```
<YOUR_URL>/api/eols/all
```

### - Software Info

- GET request for all software details

```
<YOUR_URL>/api/softwares/
```

- POST request to add a new software

```
<YOUR_URL>/api/softwares/
Data structure in POST request:
{
    name: "<software_name>",
    latest_version: "<latest_version_available>"
}
```

- PUT request to update a software

```
<YOUR_URL>/api/softwares/<software_name>
Data structure in PUT request:
{
    name: "<software_name>",
    latest_version: "<latest_version_available>"
}
```

- DELETE request to delete a software

```
<YOUR_URL>/api/softwares/<software_name>
Data structure in DELETE request:
{
    name: "<software_name>",
    latest_version: "<latest_version_available>"
}
```

- GET request to get latest software versions

```
<YOUR_URL>/api/softwares/version
```

### - ProjectSoftware Info

- GET request for all project software details

```
<YOUR_URL>/api/projectsoftwares/all
```

- GET request for all project software details for a specific project

```
<YOUR_URL>/api/projectsoftwares/<your_project_name>
```

- POST request to add a new software for a project

```
<YOUR_URL>/api/projectsoftwares/
Data structure in POST request:
{
    "project_name": "<your_project_name>",
    "software_name": "<software_name>",
    "installed_version": "<version_installed_on_project>"
}
```

- POST request to add a list of new softwares for a project

```
<YOUR_URL>/api/projectsoftwares/list
Data structure in POST request:
[
    {
        "project_name": "<your_project_name>",
        "software_name": "<software_name>",
        "installed_version": "<version_installed_on_project>"
    },
    {
        "project_name": "<your_project_name>",
        "software_name": "<software_name>",
        "installed_version": "<version_installed_on_project>"
    }
]
```

- PUT request to update a software

```
<YOUR_URL>/api/projectsoftwares/
Data structure in PUT request:
{
    "project_name": "<your_project_name>",
    "software_name": "<software_name>",
    "installed_version": "<version_installed_on_project>"
}
```

- DELETE request to delete a software

```
<YOUR_URL>/api/projectsoftwares
Data structure in DELETE request:
{
    "project_name": "<your_project_name>",
    "software_name": "<software_name>",
    "installed_version": "<version_installed_on_project>"
}
```

### - Starting a scan

- POST request to start a scan. Send a list of project names

```
<YOUR_URL>/api/startscan
Data structure in POST request:
{
    "name" : ["<project_name>", "<project_name>"]
}
```
