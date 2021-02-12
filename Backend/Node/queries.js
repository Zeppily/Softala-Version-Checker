const dotenv = require('dotenv/config')

const Pool = require("pg").Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: 'versionchecker.dev.eficode.fi',
    database: 'postgres',
    password: process.env.DB_PSWD,
    port: 5432
})

const getProjects = (request, response) => {
    pool.query('SELECT * FROM project', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProjectSoftwareInfo = (request, response) => {
    const project = request.params.project

    pool.query('SELECT project.name, software.name, project_software.installed_version, software.latest_version FROM project_software INNER JOIN project ON project_software.project_id = project.project_id INNER JOIN software ON project_software.software_id = software.software_id WHERE project_software.project_id = (SELECT project_id FROM project WHERE name = $1)', [project], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createSoftware = (request, response) => {
    const { name, latest_version } = request.body

    pool.query('INSERT INTO software (name, latest_version) VALUES ($1, $2)', [name, latest_version], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`software added with ID: ${results}`)
    })
}

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
    deleteSoftware,
    testCon
}