import database from '../src/models';
const axios = require('axios');
// This is used for WHERE IN statements and stuff like that.
// const { Op } = require("sequelize");

const getAllProjectSoftware = async() => {
    try {
        return await database.project.findAll();
    } catch (error) {
        throw error;
    }
}

const getAllProjectSpecificSoftware = async(project) => {
    const projName = project.project

    try {
        // Find the project id
        const projId = await database.project.findOne({
            attributes: ['project_id'],
            where: {
                name: projName
            }
        })
        
        if(projId){
            let projectId = JSON.stringify(projId.project_id)

            // Find all software associated with the specified project
            return await database.project_software.findAll({
                where: {
                    project_id: projectId
                },
                include: [
                    {
                        model: database.software,
                        as: 'software',
                        attributes: ['name', 'latest_version']
                    },
                    {
                        model: database.project,
                        as: 'project',
                        attributes: []
                    }
                ],
                attributes: ['installed_version'],
                raw: true
            });
        }       
        
        return
    } catch (error) {
        throw error;
    }
}

const addProjectSoftware = async(newProjectSoftware) => {
    let projectName = newProjectSoftware.project_name;
    let softwareName = newProjectSoftware.software_name;
    let installedVersion = newProjectSoftware.installed_version;

    try {
        // Find the project id
        const projId = await database.project.findOne({
            attributes: ['project_id'],
            where: {
                name: projectName
            }
        })

        // Find the software id
        let softId = await database.software.findOne({
            attributes: ['software_id'],
            where: {
                name: softwareName
            }
        })

        // Check if the software exists on the software table and add it if it does not
        if (softId === null) {
            await database.software.create({
                'name': softwareName,
                'latest_version': installedVersion
            });

            softId = await database.software.findOne({
                attributes: ['software_id'],
                where: {
                    name: softwareName
                }
            })
        }

        let projectId = JSON.stringify(projId.project_id)
        let softwareId = JSON.stringify(softId.software_id)

        // Add the software for the project to the project_software table
        return await database.project_software.create({
            'project_id': projectId,
            'software_id': softwareId,
            'installed_version': installedVersion
        });

    } catch (error) {
        throw error;
    }
}

const addListProjectSoftware = async(projectSoftwareList) => {
    // Loop through the software list for the project
    for (let proj_software of projectSoftwareList) {
        let projectName = proj_software.project_name;
        let softwareName = proj_software.software_name;
        let installedVersion = proj_software.installed_version;

        try {
            // Find the project id
            const projId = await database.project.findOne({
                attributes: ['project_id'],
                where: {
                    name: projectName
                }
            })

            // Find the software id
            let softId = await database.software.findOne({
                attributes: ['software_id'],
                where: {
                    name: softwareName
                }
            })

            // Check if the software exists on the software table and add it if it does not
            if (softId === null) {
                await database.software.create({
                    'name': softwareName,
                    'latest_version': installedVersion
                });

                softId = await database.software.findOne({
                    attributes: ['software_id'],
                    where: {
                        name: softwareName
                    }
                })
            }

            let projectId = JSON.stringify(projId.project_id)
            let softwareId = JSON.stringify(softId.software_id)

            // Add the software for the project to the project_software table
            await database.project_software.create({
                'project_id': projectId,
                'software_id': softwareId,
                'installed_version': installedVersion
            });



        } catch (error) {
            throw error;
        }

    }
    return;
}

const updateProjectSoftware = async(updateProjectSoftware) => {
    let projectName = updateProjectSoftware.project_name;
    let softwareName = updateProjectSoftware.software_name;

    try {
        // Get the project id
        let projectID = await database.project.findOne({
            attributes: ['project_id'],
            where: {
                name: projectName
            }
        })
        
        // Get the software id
        let softwareID = await database.software.findOne({
            attributes: ['software_id'],
            where: {
                name: softwareName
            }
        })
        
        // Find the software to update on the project_software table
        const projectSoftwareToUpdate = await database.project_software.findOne({
            where: {
                project_id: projectID.dataValues.project_id,
                software_id: softwareID.dataValues.software_id
            }
        });

        // Create a new object with the software id and project id rather than software name and project name
        let newProjSoftDetails = {
            "installed_version": updateProjectSoftware.installed_version,
            "software_id": softwareID.dataValues.software_id,
            "project_id": projectID.dataValues.project_id
        }

        // If the software exists for the project, update the software
        if (projectSoftwareToUpdate) {
            let a = await database.project_software.update(newProjSoftDetails, {
                where: {
                    project_id: projectID.dataValues.project_id,
                    software_id: softwareID.dataValues.software_id
                }
            });

            return updateProjectSoftware;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

const deleteProjectSoftware = async(deleteProjectSoftware) => {
    let projectName = deleteProjectSoftware.project_name;
    let softwareName = deleteProjectSoftware.software_name;

    try {
        // Get the project id
        let projectID = await database.project.findOne({
            attributes: ['project_id'],
            where: {
                name: projectName
            }
        })

        // Get the software id
        let softwareID = await database.software.findOne({
            attributes: ['software_id'],
            where: {
                name: softwareName
            }
        })

        // Find the software to delete from the project
        const projectSoftwareToDelete = await database.project_software.findOne({
            where: {
                project_id: projectID.dataValues.project_id,
                software_id: softwareID.dataValues.software_id
            }
        });

        // If the software exists for the project, delete the software
        if (projectSoftwareToDelete) {
            const deletedProjectSoftware = await database.project_software.destroy({
                where: {
                    project_id: projectID.dataValues.project_id,
                    software_id: softwareID.dataValues.software_id
                }
            });
            return deletedProjectSoftware;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

const startScan = async(projectNames) => {
        let credentials = {};
        let scan = [];
        let failedServers = []
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
                .post('http://localhost:5000/start', {
                    credentials,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    scan = res.data
                })
                .catch(error => {
                    console.error(error)
                });

            // Send credentials to the scan tool and set results to serverList variable

            // Loop through the servers in the server list
            failedServers = await serverListToDb(scan)
        } catch (error) {
            throw error;
        }
        return failedServers
}

const serverListToDb = async (data) => {
    let errorList = [];
    const serverList = data;
    for (let server in serverList) {
        // Catch any servers where the scan did not work
        if (typeof serverList[server].depList == "string") {
            errorList.append(server)
        } else {
            const hostname = serverList[server].serverIp
            // Loop through the dependencies in the server and update the installed version if needed.
            const srvDeps = serverList[server].depList
            for (let dependency in srvDeps) {
                let proj_id = await database.project.findOne({
                    attributes: ['project_id'],
                    where: {
                        host: hostname
                    }
                })
                let soft_id = await database.software.findOne({
                    attributes: ['software_id'],
                    where: {
                        name: srvDeps[dependency].depName
                    }
                })
                if (soft_id && proj_id) {
                    let found = await database.project_software.findOne({
                        where: {
                            project_id: proj_id.dataValues.project_id,
                            software_id: soft_id.dataValues.software_id
                        }
                    })
                    if (found) {
                        let res = await database.project_software.update({ installed_version: srvDeps[dependency].depVer }, {
                            where: {
                                project_id: proj_id.dataValues.project_id,
                                software_id: soft_id.dataValues.software_id
                            }
                        })
                        data.push(res)
                    } else {
                        let res = await database.project_software.create({
                            'project_id': proj_id.dataValues.project_id,
                            'software_id': soft_id.dataValues.software_id,
                            'installed_version': srvDeps[dependency].depVer
                        });
                        data.push(res)
                    }
                } else {
                    let objectToSend = { project_name: hostname, software_name: srvDeps[dependency].depName, installed_version: srvDeps[dependency].depVer }
                    ProjectSoftwareService.addProjectSoftware(objectToSend)
                }

            }

        }
    };
    return errorList
}

module.exports = {
    getAllProjectSoftware,
    getAllProjectSpecificSoftware,
    addProjectSoftware,
    addListProjectSoftware,
    updateProjectSoftware,
    deleteProjectSoftware,
    startScan
}