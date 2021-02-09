const express = require('express');

const jsonDoc = require('./test.json');

const app = express()

app.get('/', function (req, res) { //function to get data from test.json
    let jsonObj = JSON.stringify(jsonDoc)
    console.log(jsonObj)

    res.json({
        message: 'Version data',
        server_versions: jsonDoc //JSON.parse(jsonObj), needs to be used if parsing data other than JSON
    })
})


//At the moment doesn't do anything else but logs the messages to console when using with curl
app.post('/', function (req, res) {
    res.send("Hello post");
})

app.put('/', function (req, res) {
    res.send("Hello put");
})

app.delete('/', function (req, res) {
    res.send("Hello delete");
})

//starts the server on port 8080 at localhost and logs the data
const server = app.listen(8080, function () {
    const host = server.address().address
    const port = server.address().port

    console.log("Running...", host, port)
})