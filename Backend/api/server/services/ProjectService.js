import database from '../src/models';
const axios = require('axios');

const getAllProjects = async() => {
    try {
        return await database.project.findAll({
            attributes: ['host', 'name', 'uptime', 'scansuccessful', 'timestamp'],
        });
    } catch (error) {
        throw error;
    }
}

const addProject = async(newProject) => {
    try {
        return await database.project.create(newProject);
    } catch (error) {
        throw error;
    }
}

const updateProject = async(project, updateProject) => {
    try {
        const updatedProject = await database.project.update(updateProject, { 
            where: { name: project } 
        });
        if(updatedProject[0]) {
            return updatedProject;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

const updateScanResults = async(hostname, updateProject) => {
    try {
        const updatedProject = await database.project.update(
            {
                scansuccessful: updateProject.scanSuccessful,
                timestamp: updateProject.lastScanTimestamp
            },
            {
                where: { host: hostname }
            }
        );
        if(updatedProject[0]) {
            return updatedProject;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

const deleteProject = async(project) => {
    try {
        const deletedProject = await database.project.destroy({
            where: { name: project }
        });
        return deletedProject;
    } catch (error) {
        throw error;
    }
}

const getUptime = async(projectNames) => {
    let credentials = {};
    let uptimeInfo = [];
    try {
        // Get project credentials
        await database.project.findAll({
            attributes: ['host', 'username', 'password'],
            where: {
                name: projectNames
            },
            raw: true
        })
            .then(result => {
                result.forEach(function (element) {
                    element.port = 22
                })
                credentials = result;

            });

        await axios
            .post(`http://${process.env.PY_URL}:5000/uptime`, { 
                credentials,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                uptimeInfo = res.data
            })
            .catch(error => {
                console.error(error)
            });
        
        for (let i in uptimeInfo) {
            
            await database.project.update({uptime: uptimeInfo[i].uptime}, { 
                where: { 
                    host: uptimeInfo[i].host 
                } 
            });
        }
            return "Uptime Information Added Successfully"
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllProjects,
    addProject,
    updateProject,
    deleteProject,
    getUptime,
    updateScanResults
}