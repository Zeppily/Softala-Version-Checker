import database from '../src/models';
import software from '../src/models/software';

class ProjectSoftwareService {
    static async getAllProjectSoftware() {
        try {
            return await database.Project.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async getAllProjectSpecificSoftware(project) {
        console.log(project.project)
        const projName = project.project

        try {
            const projId = await database.Project.findOne({
                attributes: ['project_id'],
                where: {
                    name: projName
                }
            })
            console.log(`this is the projID ${JSON.stringify(projId)}`)
            let projectId = JSON.stringify(projId.project_id)
            console.log(`this is the projectID ${projectId}`)

            // return await database.Project_Software.findAll({
            //     where: {
            //         project_id: projectId
            //     },
            //     include: [
            //         {
            //             model: database.Software
            //         },
            //         {
            //             model: database.Project
            //         }
            //     ],
            //     attribute: ['installed_version']
            // })
            // return await database.Project_Software.findAll({
            //         where: {
            //             project_id: projectId
            //         },   
                    // include: [
                    //     {
                    //         model: database.Software, 
                    //         as: 'software', 
                    //         through: {
                    //             model: database.Project_Software, 
                    //             attributes: ['installed_version']
                    //         },
                    //         // attributes: []
                    //         attributes: ['name', 'latest_version']          
                    //     }
                    // ],
                    // attributes: ['name', 
                    //                 // [Sequelize.literal('"software->Project_Software"."installed_version"'), 'installed_version'],
                    //                 // [Sequelize.literal('"software"."name"'), 'softwareName'],
                    //                 // [Sequelize.literal('"software"."latest_version"'), 'latest_version'],
                    //             ],
                    // //raw: true 
                    //         });                
                //     include: [
                //         {
                //             model: database.Software, 
                //             as: 'software', 
                //             // through: {
                //             //     model: database.Project, 
                //             //     attributes: ['installed_version']
                //             // },
                //             // attributes: []
                //             attributes: ['name', 'latest_version']          
                //         },
                //         {
                //             model: database.Project,
                //             as: 'project',
                //             attributes: ['name']
                //         }
                //     ],
                //     attributes: ['name'],
                //     // raw: true
                // });
            
            return await database.Project_Software.findAll({
                where: {
                    project_id: projectId
                },
                include: [
                    {
                        model: database.Software,
                        as: 'software',
                        attributes: ['name', 'latest_version']
                    },
                    {
                        model: database.Project,
                        as: 'project',
                        attributes: []
                    }
                ],
                attributes: ['installed_version'],
                raw: true
            });
        } catch (error) {
            throw error;
        }
    }

    static async getProjectSoftwareVersionInfo(req, res) {
        try {
            return 
        } catch (error) {
            throw error;
        }
    }

    static async addProjectSoftware(newProjectSoftware) {
        let projectName = newProjectSoftware.project_name;
        let softwareName = newProjectSoftware.software_name;
        let installedVersion = newProjectSoftware.installed_version;
        console.log('hello to you!')
        try {
            console.log('how are you')
            const projId = await database.Project.findOne({
                attributes: ['project_id'],
                where: {
                    name: projectName
                }
            })
            
            const softId = await database.Software.findOne({
                attributes: ['software_id'],
                where: {
                    name: softwareName
                }
            })
            let projectId = JSON.stringify(projId.project_id)
            let softwareId = JSON.stringify(softId.software_id)
            console.log(`this is the projectID ${projectId}`)
            console.log(`this is the softwareID ${softwareId}`)
            console.log(`this is the installedVersion ${installedVersion}`)
            
            return await database.Project_Software.create({
                'project_id': projectId, 
                'software_id': softwareId, 
                'installed_version': installedVersion
            });

            // return await database.ProjectSoftware.create({
            //     project_id: `${projectId}`, 
            //     software_id: `${softwareId}`,
            //     installed_version: `${installedVersion}`
            // }, { fields: ['project_id', 'software_id', 'installed_version']});
        } catch (error) {
            throw error;
        }
    }

    static async updateProjectSoftware(updateProjectSoftware) {
        let projectName = updateProjectSoftware.project_name;
        let softwareName = updateProjectSoftware.software_name;

        try {
            const projectSoftwareToUpdate = await database.ProjectSoftware.findOne({
                where: {
                    project_id: (database.Project.findOne({
                        attributes: [project_id],
                        where: {
                            name: projectName
                        }
                    })),
                    software_id: (database.Software.findOne({
                        attributes: [software_id],
                        where: {
                            name: softwareName
                        }
                    }))
                }
            });

            if (projectSoftwareToUpdate) {
                await database.ProjectSoftware.update(updateProjectSoftware, { 
                    where: { 
                        project_id: (database.Project.findOne({
                            attributes: [project_id],
                            where: {
                                name: projectName
                            }
                        })),
                        software_id: (database.Software.findOne({
                            attributes: [software_id],
                            where: {
                                name: softwareName
                            }
                        }))
                    } 
                });

                return updateProjectSoftware;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async deleteProjectSoftware(deleteProjectSoftware) {
        let projectName = updateProjectSoftware.project_name;
        let softwareName = updateProjectSoftware.software_name;

        try {
            const projectSoftwareToDelete = await database.ProjectSoftware.findOne({ 
                 where: {
                    project_id: (database.Project.findOne({
                        attributes: [project_id],
                        where: {
                            name: projectName
                        }
                    })),
                    software_id: (database.Software.findOne({
                        attributes: [software_id],
                        where: {
                            name: softwareName
                        }
                    }))
                } 
            });

            if (projectSoftwareToDelete) {
                const deletedProjectSoftware = await database.ProjectSoftware.destroy({
                    where: {
                        project_id: (database.Project.findOne({
                            attributes: [project_id],
                            where: {
                                name: projectName
                            }
                        })),
                        software_id: (database.Software.findOne({
                            attributes: [software_id],
                            where: {
                                name: softwareName
                            }
                        }))
                    }
                });
                return deletedProjectSoftware;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default ProjectSoftwareService;