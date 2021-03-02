const axios = require('axios');

const runPython = () => {
    axios
        .post('http://127.0.0.1:5000/start', {
            "credentials": [
                {
                    "host": "65.21.6.198",
                    "port": "22",
                    "username": "hh-admin",
                    "password": ""
                },
                {
                    "host": "65.21.6.199",
                    "port": "22",
                    "username": "hh-admin",
                    "password": ""
                },
                {
                    "host": "65.21.6.200",
                    "port": "22",
                    "username": "hh-admin",
                    "password": ""
                }
            ]
        })
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })

}

module.exports = {
    runPython
}