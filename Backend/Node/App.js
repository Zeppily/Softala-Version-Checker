// Imports
const express = require('express');
const jsonDoc = require('./test.json');
const bodyParser = require('body-parser');
const db = require('./queries');
const cors = require('cors');

const app = express()

app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
}
)

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', function (req, res) { // function to get data from test.json file
    let jsonObj = JSON.stringify(jsonDoc)
    console.log(jsonObj)

    res.json({
        message: 'Version data',
        server_versions: jsonDoc // JSON.parse(jsonObj), needs to be used if parsing data other than JSON
    })
})

// app.get('/test', db.testCon)
app.get('/projects', db.getProjects)
app.get('/info/:project', db.getProjectSoftwareInfo)
app.get('/eolinfo', db.getEol)
app.post('/software', db.createSoftware)
app.post('/projectsoftware', db.createProjectSoftware)
app.post('/eol', db.createEol)
app.put('/software/:id', db.updateSoftware)
app.delete('/software/:id', db.deleteSoftware)


//At the moment doesn't do anything else but logs the messages to console when using with curl
/*
app.post('/', function (req, res) {
    res.send("Hello post");
})

app.put('/', function (req, res) {
    res.send("Hello put");
})

app.delete('/', function (req, res) {
    res.send("Hello delete");
})*/

//starts the server on port 8080 at localhost and logs the data
const server = app.listen(8080, function () {
    const host = server.address().address
    const port = server.address().port

    console.log("Running...", host, port)
})

module.exports = server