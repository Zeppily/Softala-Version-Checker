import EOLService from '../services/EOLService';
import Util from '../utils/Utils';

const util = new Util();

const getAllEOLs = async(req, res) => {
    try {
        const allEOLs = await EOLService.getAllEOLs();
        if (allEOLs.length > 0) {
            util.setSuccess(200, 'EOLs retrieved', allEOLs);
        } else {
            util.setSucess(200, 'No EOLs found');
        }
        return util.send(res);
    } catch (error) {
        util.setError(400, error);
        return util.send(res);
    }
}

const getProjectSpecificEOLs = async(req, res) => {
    const project = req.params;

    try {
        const allProjectSpecificEOLS = await EOLService.getProjectSpecificEOLs(project);
        console.log(allProjectSpecificEOLS);
        if(allProjectSpecificEOLS.length > 0) {
            util.setSuccess(200, `EOL information for software installed on ${project.project} project`, allProjectSpecificEOLS);
        } else {
            util.setSuccess(200, `No eol information available for ${project.project} project`)
        }
        return util.send(res);
    } catch (error) {
        console.log(error)
        util.setError(400, error);
        return util.send(res);
    }
}

// Add a single EOL record
const addEOL = async(req, res) => {
    console.log(req.body)
    if (!req.body.software_name || !req.body.version || !req.body.eol_date) {
        util.setError(400, 'Please provide complete details');
        return util.send(res);
    }
    const newEOL = req.body;
    console.log(newEOL);
    try {
        const createdEOL = await EOLService.addEOL(newEOL);
        util.setSuccess(201, 'EOL Added!', createdEOL);
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
    }
}

// Add a list of EOL information
const addEOLList = async(req, res) => {
    console.log(req.body)
    /*if (!req.body.software_name || !req.body.version || !req.body.eol_date) {
        util.setError(400, 'Please provide complete details');
        return util.send(res);
    }*/
    const eolList = req.body;
    try {
        const createdEolList = await EOLService.addEOLList(eolList);
        util.setSuccess(201, 'Eol added!', createdEolList);
        //console.log(res)
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        console.log(res)
        return util.send(res);
    }
}

// Update a single EOL record
const updatedEOL = async(req, res) => {
    const alteredEOL = req.body;
    //const { id } = req.params;
    // if (!Number(id)) {
    //     util.setError(400, ' Please input a valid id');
    //     return util.send(res);
    // }
    try {
        const updateEOL = await EOLService.updateEOL(alteredEOL);
        if (!updateEOL) {
            util.setError(404, `Cannot find EOL with the software: ${alteredEOL.software_name} and version: ${alteredEOL.version}`);
        } else {
            util.setSuccess(200, 'EOL updated', updateEOL);
        }
        return util.send(res);
    } catch (error) {
        util.setError(404, error);
        return util.send(res);
    }
}

// Delete a single EOL record
const deleteEOL = async(req, res) => {
    const deletedEOL = req.body;
    //const { id } = req.params;

    // if (!Number(id)) {
    //     util.setError(400, 'Please provide a numeric value for id');
    //     return util.send(res);
    // }

    try {
        const eolToDelete = await EOLService.deleteEOL(deletedEOL);

        if (eolToDelete) {
            util.setSuccess(200, 'EOL deleted');
        } else {
            util.setError(404, `EOL with the software ${deletedEOL.name} and version ${deletedEOL.version} cannot be found`);
        }
        return util.send(res);
    } catch (error) {
        util.setError(400, error);
        return util.send(res);
    }
}

module.exports = {
    getAllEOLs,
    getProjectSpecificEOLs,
    addEOL,
    addEOLList,
    updatedEOL,
    deleteEOL
}

// class EOLController {
//     // Return all information on the EOL table

//     static async getAllEOLs(req, res) {
//         try {
//             const allEOLs = await EOLService.getAllEOLs();
//             if (allEOLs.length > 0) {
//                 util.setSuccess(200, 'EOLs retrieved', allEOLs);
//             } else {
//                 util.setSucess(200, 'No EOLs found');
//             }
//             return util.send(res);
//         } catch (error) {
//             util.setError(400, error);
//             return util.send(res);
//         }
//     }

//     // Return all EOL information for software installed on a project
//     static async getProjectSpecificEOLs(req, res) {
//         const project = req.params;

//         try {
//             const allProjectSpecificEOLS = await EOLService.getProjectSpecificEOLs(project);
//             console.log(allProjectSpecificEOLS);
//             if(allProjectSpecificEOLS.length > 0) {
//                 util.setSuccess(200, `EOL information for software installed on ${project.project} project`, allProjectSpecificEOLS);
//             } else {
//                 util.setSuccess(200, `No eol information available for ${project.project} project`)
//             }
//             return util.send(res);
//         } catch (error) {
//             console.log(error)
//             util.setError(400, error);
//             return util.send(res);
//         }
//     }

//     // Add a single EOL record
//     static async addEOL(req, res) {
//         console.log(req.body)
//         if (!req.body.software_name || !req.body.version || !req.body.eol_date) {
//             util.setError(400, 'Please provide complete details');
//             return util.send(res);
//         }
//         const newEOL = req.body;
//         console.log(newEOL);
//         try {
//             const createdEOL = await EOLService.addEOL(newEOL);
//             util.setSuccess(201, 'EOL Added!', createdEOL);
//             return util.send(res);
//         } catch (error) {
//             util.setError(400, error.message);
//             return util.send(res);
//         }
//     }

//     // Add a list of EOL information
//     static async addEOLList(req, res) {
//         console.log(req.body)
//         /*if (!req.body.software_name || !req.body.version || !req.body.eol_date) {
//             util.setError(400, 'Please provide complete details');
//             return util.send(res);
//         }*/
//         const eolList = req.body;
//         try {
//             const createdEolList = await EOLService.addEOLList(eolList);
//             util.setSuccess(201, 'Eol added!', createdEolList);
//             //console.log(res)
//             return util.send(res);
//         } catch (error) {
//             util.setError(400, error.message);
//             console.log(res)
//             return util.send(res);
//         }
//     }

//     // Update a single EOL record
//     static async updatedEOL(req, res) {
//         const alteredEOL = req.body;
//         //const { id } = req.params;
//         // if (!Number(id)) {
//         //     util.setError(400, ' Please input a valid id');
//         //     return util.send(res);
//         // }
//         try {
//             const updateEOL = await EOLService.updateEOL(alteredEOL);
//             if (!updateEOL) {
//                 util.setError(404, `Cannot find EOL with the software: ${alteredEOL.software_name} and version: ${alteredEOL.version}`);
//             } else {
//                 util.setSuccess(200, 'EOL updated', updateEOL);
//             }
//             return util.send(res);
//         } catch (error) {
//             util.setError(404, error);
//             return util.send(res);
//         }
//     }

//     // Delete a single EOL record
//     static async deleteEOL(req, res) {
//         const deletedEOL = req.body;
//         //const { id } = req.params;

//         // if (!Number(id)) {
//         //     util.setError(400, 'Please provide a numeric value for id');
//         //     return util.send(res);
//         // }

//         try {
//             const eolToDelete = await EOLService.deleteEOL(deletedEOL);

//             if (eolToDelete) {
//                 util.setSuccess(200, 'EOL deleted');
//             } else {
//                 util.setError(404, `EOL with the software ${deletedEOL.name} and version ${deletedEOL.version} cannot be found`);
//             }
//             return util.send(res);
//         } catch (error) {
//             util.setError(400, error);
//             return util.send(res);
//         }
//     }
// }

// export default EOLController;