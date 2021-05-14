const axios = require('axios');
import projectService from './ProjectService'
import eolService from './EOLService'

const eolSlack = async() => {
    let projects = await projectService.getAllProjects()
    let data = []
    for(let project in projects) {
        let projectToSend = {'project': projects[project].dataValues.name}
        let eols = await eolService.getProjectSpecificEOLs(projectToSend)
        let outDatePerServer = {serverName: projects[project].dataValues.name, outOfDate: 0}
        eols.forEach(eol => {
            let outOfDate = eolOutOfDate(eol.eol_date)
            if(outOfDate) {
                outDatePerServer.outOfDate++
            }
        })
        data.push(outDatePerServer)
    }
    return data
}

const eolOutOfDate = (eol_date) => {
    const formatted_eol_date = new Date(eol_date)
    const currentDate = new Date(); 
    const diffTime = (formatted_eol_date - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let result = false

    if (diffDays <= 0) {                       
      result = true
    }

    return result
}

const slackBot = async() => {

    const webhookUrl = `${process.env.SLACK_URL}`;

    const eolInfo = await eolSlack()
    let output = ''
    eolInfo.forEach(eol => {
        if(eol.outOfDate){
            output += `Server name: ${eol.serverName}, Out of Date: ${eol.outOfDate} \n`
        }
    })
    const data = {
        "text": output,
        "username": 'VersionCheckerBot',
        "channel": '#testing-slack-bot',
        "icon_emoji": ":ghost:"
    }
    let res = await axios.post(
        webhookUrl, 
        JSON.stringify(data))
        .then((res) => {
            console.log('res: ', res)
        })

}

module.exports = {
    slackBot
}