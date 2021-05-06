import database from '../src/models';
const axios = require('axios');

const getAllSoftwares = async() => {
    try {
        return await database.software.findAll();
    } catch (error) {
        throw error;
    }
}

const addSoftware = async(newSoftware) => {
        try {
            return await database.software.create(newSoftware);
        } catch (error) {
            throw error;
        }
}

// const updateSoftware = async(id, updateSoftware) => {
//     try {
//         const softwareToUpdate = await database.software.findOne({
//             where: { software_id: Number(id) }
//         });

//         if (softwareToUpdate) {
//             await database.software.update(updateSoftware, { where: { software_id: Number(id) } });

//             return updateSoftware;
//         }
//         return null;
//     } catch (error) {
//         throw error;
//     }
// }

const updateSoftware = async(software, updateSoftware) => {
    try {
        const updatedSoftware = await database.software.update(updateSoftware, { 
            where: { name: software } 
        });
        if(updatedSoftware[0]) {
            return updatedSoftware;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

const getLatestSoftware = async() => {
    let softwares = await database.software.findAll({attributes: ['name'], raw: true});
    let software_list = softwares.map(software => software.name)    
    let new_software_version_info;
    try {
        await axios
            .post(`http://policy_client/version/`, {
                software_list, 
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                new_software_version_info = res.data
            })
            .catch(error => {
                console.error(error)
            });
        new_software_version_info.forEach(software => {
            updateSoftware(software.name, software)
        })

        return new_software_version_info;
    } catch (error) {
        console.error(error)
        throw error
    }
}


const deleteSoftware = async(software) => {
    try {
        const deletedSoftware = await database.software.destroy({
            where: { name: software }
        });
        return deletedSoftware;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllSoftwares,
    addSoftware,
    updateSoftware,
    deleteSoftware,
    getLatestSoftware
}
