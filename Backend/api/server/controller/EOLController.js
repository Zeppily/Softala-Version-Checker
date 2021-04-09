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
        util.setError(400, error.message);
        return util.send(res);
    }
}

const getProjectSpecificEOLs = async(req, res) => {
    const project = req.params;

    try {
        const allProjectSpecificEOLS = await EOLService.getProjectSpecificEOLs(project);
        if(allProjectSpecificEOLS.length > 0) {
            util.setSuccess(200, `EOL information for software installed on ${project.project} project`, allProjectSpecificEOLS);
        } else {
            util.setSuccess(200, `No eol information available for ${project.project} project`)
        }
        return util.send(res);
    } catch (error) {
        console.log(error)
        util.setError(400, error.message);
        return util.send(res);
    }
}

// Add a single EOL record
const addEOL = async(req, res) => {
    if (!req.body.software_name || !req.body.version || !req.body.eol_date) {
        util.setError(400, 'Please provide complete details');
        return util.send(res);
    }
    const newEOL = req.body;
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
    const eolList = req.body;
    
    eolList.forEach(record => {
        if (!record.software_name || !record.version || !record.eol_date) {
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
    })
    
    try {
        const createdEolList = await EOLService.addEOLList(eolList);
        util.setSuccess(201, 'Eol added!', createdEolList);
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
    }
}

// Update a single EOL record
const updatedEOL = async(req, res) => {
    const alteredEOL = req.body;

    try {
        const updateEOL = await EOLService.updateEOL(alteredEOL);
        if (!updateEOL) {
            util.setError(404, `Cannot find EOL with the software: ${alteredEOL.software_name} and version: ${alteredEOL.version}`);
        } else {
            util.setSuccess(200, 'EOL updated', updateEOL);
        }
        return util.send(res);
    } catch (error) {
        util.setError(404, error.message);
        return util.send(res);
    }
}

// Delete a single EOL record
const deleteEOL = async(req, res) => {
    const deletedEOL = req.body;

    try {
        const eolToDelete = await EOLService.deleteEOL(deletedEOL);

        if (eolToDelete) {
            util.setSuccess(200, 'EOL deleted');
        } else {
            util.setError(404, `EOL with the software ${deletedEOL.software_name} and version ${deletedEOL.version} cannot be found`);
        }
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
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