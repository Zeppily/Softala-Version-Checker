import database from '../src/models';
import service from './ProjectSoftwareService'
import db from '../src/models/index'
const { Op, Sequelize } = require("sequelize");
const axios = require('axios');

// Return all EOLs from the EOL table
const getAllEOLs = async() => {
    try {
        return await database.eol.findAll();
    } catch (error) {
        throw error;
    }
}

// Get project specific eol information
const getProjectSpecificEOLs = async(project) => {
    let eols = []

    try {
        // Get a list of softwares used in the project
        const softwares = await service.getAllProjectSpecificSoftware(project);
        
        if(softwares) {
                // Loop through the individual software on the project
            for (let i in softwares) {
                
                // Get the relevant information we need for the search
                let name = softwares[i]['software.name'];
                let vers = softwares[i].installed_version
                
                let formatted_name1 = name.match(/[A-Za-z0-9]+-/)
                let formatted_name2 = name.match(/[A-Za-z]+/)

                if (Array.isArray(formatted_name1)) {
                    formatted_name1 = formatted_name1[0]
                }
                
                if (Array.isArray(formatted_name2)) {
                    formatted_name2 = formatted_name2[0]
                }

                // Format the version number so it gives us multiple options to search eols with
                // Gets the version number up to the first '.'
                let version = vers.match(/[0-9]+./);
                // Gets the version number if its just one number, not split by '.'
                let exact = vers.match(/[0-9]+/);
                // Gets the first 2 numbers of the version if valid
                let stricter_version = vers.match(/[0-9]+.[0-9]./)
                // commented original out. removed the . at the end
                let strict_version = vers.match(/[0-9]+.[0-9]/)

                let eolInfo = await database.eol.findAll({
                    where: {
                        [Op.and]: {
                            software_name : {
                                [Op.or] : [{[Op.like] : name}, {[Op.like] : formatted_name1}, {[Op.like] : formatted_name2 }]
                            },
                            version: {
                                    [Op.or] : [{[Op.like]: `${stricter_version}%`}, {[Op.like]: `${strict_version}%`}, {[Op.like]: `${version}%`}, exact]
                            }
                               
                            
                        }
                        
                    }
                });
                // If db query returns somethong we go into the statement
                if (eolInfo.length >= 1) {
                    let insert = true;
                    // If the db query returns more than one result we ave to loop through the results to find the best match
                    if(eolInfo.length > 1) {
                        eolInfo.forEach(eInfo => {
                            if(eInfo.dataValues.version == vers || eInfo.dataValues.version == strict_version){
                                eols.forEach(e => {
                                    let x = (e.software_name == eInfo.dataValues.software_name)
                                    let y = (e.version == eInfo.dataValues.version)                        
                                    if(x && y) { 
                                        insert = false
                                    }                                                       
                                })

                                if (insert){
                                    eols.push(eInfo.dataValues)
                                }
                            }                            
                        })
                    } else {
                        // If just one result is returned from db query we check if that info is already in the list and add if not adds to the list
                        eolInfo.forEach(eInfo => {
                                if(eols > 0){
                                    eols.forEach(e => {
                                        let x = (e.software_name == eInfo.dataValues.software_name)
                                        let y = (e.version == eInfo.dataValues.version)                        
                                        if(x && y) { 
                                            insert = false
                                        }
                                    }) 
    
                                    if (insert){
                                        eols.push(eInfo.dataValues)
                                    } 
                                } else {
                                    eols.push(eInfo.dataValues)
                                }                                
                        })
                    }    
                }               
            }
        }       
        return eols
    } catch (error) {
        throw error;
    }
}

// Add a single new EOL
const addEOL = async(newEOL) => {
    try {
        return await database.eol.create(newEOL);
    } catch (error) {
        throw error;
    }
}

// Add a list of new EOLs
const addEOLList = async(eolList) => {
    try {
        await database.eol.bulkCreate(eolList, { ignoreDuplicates: true})
        return "Eols Added Successfully"
    } catch (error) {
        throw error;
    }
}

//Calling the python EoL fetcher
const scanEOLs = async() => {
    let software_list = [];
    try {
        await axios
            .get(`http://${process.env.PY_URL}:5000/eols`)
                .then(res => software_list = res.data.softwareList)
                .catch(error => {
                    console.error(error)
                })

        const addEols = await addEOLList(software_list)
        return addEols
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Update a single EOL record
const updateEOL = async(updateEOL) => {
    let name = updateEOL.software_name;
    let version = updateEOL.version
    try {
        const eolToUpdate = await database.eol.findOne({
            where: {
                software_name: name,
                version: version
            }
        });

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
const deleteEOL = async(deleteEOL) => {
    let name = deleteEOL.software_name;
    let version = deleteEOL.version

    try {
        const deletedEOL = await database.eol.destroy({
            where: {
                software_name: name,
                version: version
            }
        });
        return deletedEOL;
    } catch (error) {
        throw error;
    }
}

//Delete all eols
const deleteAllEOLs = async() => {

    try {
        const deletedEOLs = await database.eol.destroy({
            where: {},
            truncate: true
        });
        // If delete was successful, deletedEOLs will = 0.
        return deletedEOLs;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllEOLs,
    getProjectSpecificEOLs,
    addEOL,
    addEOLList,
    scanEOLs,
    updateEOL,
    deleteEOL,
    deleteAllEOLs
}