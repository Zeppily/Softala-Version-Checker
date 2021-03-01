const dotenv = require('dotenv/config')

const Pool = require("pg").Pool
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

// POST function for adding new software to DB
const createProjectSoftware = (request, response) => {
    const {project, software, installed_version} = request.body
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
                END $$`, /*[project, software, installed_version],*/ (error, results) => {
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
    createProjectSoftware
}