import database from '../src/models';
import service from './ProjectSoftwareService'
import db from '../src/models/index'
const { Op, Sequelize } = require("sequelize");
const axios = require('axios');

class EOLService {
    // Return all EOLs from the EOL table
    static async getAllEOLs() {
        try {
            return await database.eol.findAll();
        } catch (error) {
            throw error;
        }
    }

    // Get project specific eol information
    static async getProjectSpecificEOLs(project) {
        
        let eols = []

        try {
            // Get a list of softwares used in the project
            const softwares = await service.getAllProjectSpecificSoftware(project);
            
            // Loop through the individual software on the project
            for (let i in softwares) {
                
                // Get the relevant information we need for the search
                let name = softwares[i]['software.name'];
                let vers = softwares[i].installed_version
                
                // Format the version number so it only takes the first number of the version ('12.3.6' becomes '12.')
                let version = vers.substr(0, (vers.indexOf('.')));

                // Find the eol information for the software
                let eolInfo = await database.eol.findOne({
                    where: {
                        [Op.and]: {
                            software_name : {
                                [Op.like] : `%${name}%`
                            },
                            version: {
                                [Op.like] : `${version}%`
                            }
                        }
                        
                    }
                });
                
                // if eol info found add it to the eol list
                if(eolInfo != null) {
                    eols.push(eolInfo.dataValues)
                }
            }
            
            return eols
        } catch (error) {
            throw error;
        }
    }

    // Add a single new EOL
    static async addEOL(newEOL) {
        console.log(newEOL)
        try {
            return await database.eol.create(newEOL);
        } catch (error) {
            throw error;
        }
    }

    // Add a list of new EOLs
    static async addEOLList(eolList, req, res) {
        console.log("eollist in addEollist:", eolList)
        try {
            await database.eol.bulkCreate(eolList, { ignoreDuplicates: true})
            return "Eols Added Successfully"
        } catch (error) {
            throw error;
        }
    }

    //Calling the python EoL fetcher
    static async scanEOLs() {
        let software_list = [];
        console.log("scanEols")
        try {
            await axios
                    .get('http://127.0.0.1:5000/eols')
                    .then(res => software_list = res.data.softwareList)
                    .catch(error => {
                        console.error(error)
                    })

            const addEols = await EOLService.addEOLList(software_list)
            return addEols
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    // Update a single EOL record
    static async updateEOL(updateEOL) {
        console.log(updateEOL);
        let name = updateEOL.software_name;
        let version = updateEOL.version
        try {
            const eolToUpdate = await database.eol.findOne({
                where: {
                    software_name: name,
                    version: version
                }
            });
            console.log(eolToUpdate)

            if (eolToUpdate) {
                await database.eol.update(updateEOL, {
                    where: {
                        software_name: name,
                        version: version
                    }
                });

                return updateEOL;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    // Delete a single EOL record
    static async deleteEOL(deleteEOL) {
        let name = deleteEOL.software_name;
        let version = deleteEOL.version

        console.log(`This is the name: ${name} and this is the version ${version}`)
        try {
            const eolToDelete = await database.eol.findOne({
                where: {
                    software_name: name,
                    version: version
                }
            });
            console.log(`this is the eol to delete ${eolToDelete}`)
            if (eolToDelete) {
                const deletedEOL = await database.eol.destroy({
                    where: {
                        software_name: name,
                        version: version
                    }
                });
                return deletedEOL;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default EOLService;