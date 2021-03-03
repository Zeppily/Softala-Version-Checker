const dotenv = require('dotenv/config')

const axios = require('axios')


const Pool = require("pg").Pool
const server = require('./App')
const pool = new Pool({
    user: process.env.DB_USER,
    host: 'versionchecker.dev.eficode.fi',
    database: 'postgres',
    password: process.env.DB_PSWD,
    port: 5432
})

// Gets project(servers) names from DB
const getProjects = (request, response) => {
    pool.query('SELECT * FROM project', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Gets project software info by project name
const getProjectSoftwareInfo = (request, response) => {
    console.log(request)
    const project = request.params.project

    pool.query('SELECT project.name, software.name, project_software.installed_version, software.latest_version FROM project_software INNER JOIN project ON project_software.project_id = project.project_id INNER JOIN software ON project_software.software_id = software.software_id WHERE project_software.project_id = (SELECT project_id FROM project WHERE name = $1)', [project], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// POST function for adding new software to DB
const createSoftware = (request, response) => {
    const { name, latest_version } = request.body

    pool.query('INSERT INTO software (name, latest_version) VALUES ($1, $2) RETURNING software_id', [name, latest_version], (error, results) => {
        if (error) {
            throw error
        }
        console.log("This is the insert id : " + JSON.stringify(results.rows[0].software_id))
        response.status(201).send(JSON.stringify(results.rows[0].software_id))
    })
}

// Post function for adding new eol to DB
/*const createEol = (request, response) => {
    const { software_name, version, eol_date } = request.body

    pool.query('INSERT INTO eol (software_name, version, eol_date) VALUES ($1, $2, $3) RETURNING eol_id', [software_name, version, eol_date], (error, results) => {
        if (error) {
            throw error
        }
        console.log("This is the insert id : " + JSON.stringify(results.rows[0].software_id))
        response.status(201).send(JSON.stringify(results.rows[0].software_id))
    })
}*/

// POST function for adding new software to DB
const createProjectSoftware = (request, response) => {
    const { project, software, installed_version } = request.body
    console.log(`this is the project = ${project}`)
    pool.query(`
                do $$
                DECLARE 
                    $1 varchar(50) := '${project}';
                    $2 varchar(50) := '${software}';
                    $3 varchar(50) := '${installed_version}';
                BEGIN
                    IF EXISTS (SELECT * FROM software WHERE name = $2) THEN
                        INSERT INTO project_software (project_id, software_id, installed_version) 
                            VALUES ((SELECT project_id FROM project WHERE name = $1), (SELECT software_id FROM software WHERE name = $2), $3);
                    ELSE
                        INSERT INTO software (name, latest_version) VALUES ($2, $3);
                        INSERT INTO project_software (project_id, software_id, installed_version) 
                            VALUES ((SELECT project_id FROM project WHERE name = $1), (SELECT software_id FROM software WHERE name = $2), $3);
                    END IF;
                END $$`, /*[project, software, installed_version],*/(error, results) => {
        if (error) {
            throw error
        }
        console.log(results)
        // console.log("This is the insert id : " + JSON.stringify(results.rows[0].software_id))
        // response.status(201).send(JSON.stringify(results.rows[0].software_id))
    })
}

// PUT function for updating existing software in DB
const updateSoftware = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, latest_version } = request.body

    pool.query(
        'UPDATE software SET name = $1, latest_version = $2 where software_id = $3',
        [name, latest_version, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

// DELETE function for deleting software from DB
const deleteSoftware = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM software WHERE software_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }

        response.status(200).send(`Software deleted with ID: ${id}`)
    })
}

const createEol = (request, response) => {
    const { software, version, eol } = request.body

    let software_name = software.toLowerCase().replace(/\s/g, '')
    pool.query('INSERT INTO eol (software_name, version, eol_date) VALUES ($1, $2, $3)', [software_name, version, eol], (error, results) => {
        if (error) {
            throw error
        }
        //console.log("This is the insert id : " + JSON.stringify(results.rows[0].software_id))
        response.status(201).send(JSON.stringify(results.rows[0])

        )
    })
}

const getEolTest = (request, response) => {
    pool.query('SELECT * FROM eol', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEol = (request, response) => {
    // DATA SENT AS A LIST
    // console.log(request.body)
    // const softwareList = request.body.softwareList
    let sqlStatement = `SELECT * FROM eol WHERE`;
    let softwareList = request.body.softwareList
    let count = 0;
    softwareList.forEach(software => {
        let vers = software.version
        let version = vers.substr(0, vers.indexOf('.'));
        if (count == 0) {
            sqlStatement += ` (software_name LIKE '%${software.name}%' AND version LIKE '${version}%')`
            count++;
        } else {
            sqlStatement += ` OR (software_name LIKE '%${software.name}%' AND version LIKE '${version}%')`
        }
    })

    sqlStatement += ';'
    console.log(sqlStatement)

    count = 0;

    pool.query(sqlStatement, (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        console.log(response.status(200).json(results.rows))
        response.status(200).json(results.rows)

    })

    // BASIC GET RETURNING ONE ROW

    // const software = request.params.software
    // const vers = request.params.version

    // let version = vers.substr(0, vers.indexOf('.'));

    // pool.query(`'SELECT * FROM eol WHERE name LIKE '%${software}%' AND version = '${version}%'`), [project], (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     response.status(200).json(results.rows)

    // }
}

const getAllEol = (request, response) => {
    pool.query('SELECT * FROM eol', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const startScan = (request, response) => {
    //TODO: This should be broken down into smaller pieces
    //Frontend posts list of project names
    //Retrieve credentials and address for the production servers from the db
    //Post a list of credentials to py scantool Flask endpoint
    //Process data py scantool sends back
    //Save data to db
    //Send message to frontend that contains a list of servers where SSH connecton failed
    const projectNames = request.body
    console.log(projectNames)
    const params = []
    const dataToScantool = { credentials: "" }
    for (let i = 1; i <= projectNames.length; i++) {
        params.push('$' + i)
    }

    pool.query(`SELECT host, username, password FROM Project WHERE name IN (${params.join(',')})`, projectNames, (error, results) => {
        if (error) {
            throw error
        }
        dataToScantool.credentials = results.rows

    })

    axios
        .post('127.0.0.1:5000/start', {
            dataToScanTool
        })
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
            serverList = res.data
        })
        .catch(error => {
            console.error(error)
        })

    errorList = []
    const hostname = ""

    for (server in serverList) {
        if (typeof server.depList == "string") {
            errorList.append(server)
        } else {
            hostname = server.serverIp
            for (dependency in server.depList) {
                pool.query(`UPDATE Project_Software SET installed_version = $1 
                            WHERE project_id = SELECT project_id FROM Project WHERE host = $2 AND software_id = SELECT software_id FROM Software WHERE name = $3`,
                    [dependency.depVer, hostname, dependency.depName.toLowerCase()], (error, results) => {
                        if (error) {
                            throw error
                        }

                    })
            }

        }
    }

    response.status(200).send(`Great Success! Except these servers failed: ${errorList}`)

}

//For testing that the connection works
const testCon = (request, results) => {
    pool.query('SELECT NOW()', (err, res) => {
        console.log(err, res)
        pool.end()
    })
}

module.exports = {
    getProjects,
    getProjectSoftwareInfo,
    createSoftware,
    updateSoftware,
    deleteSoftware,
    testCon,
    createProjectSoftware,
    getEol,
    createEol,
    startScan,
    getAllEol
}