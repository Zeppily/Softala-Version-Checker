import SoftwareService from '../services/SoftwareService';
import Util from '../utils/Utils';

const util = new Util();

const getAllSoftwares = async(req, res) => {
    try {
        const allSoftwares = await SoftwareService.getAllSoftwares();
        if (allSoftwares.length > 0) {
            util.setSuccess(200, 'Software retrieved', allSoftwares);
        } else {
            util.setSucess(200, 'No software found');
        }
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
    }
}

const addSoftware = async(req, res) => {
    if (!req.body.name || !req.body.latest_version) {
        util.setError(400, 'Please provide complete details');
        return util.send(res);
    }
    const newSoftware = req.body;
    try {
        const createdSoftware = await SoftwareService.addSoftware(newSoftware);
        util.setSuccess(201, 'Software Added!', createdSoftware);
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        console.log(error);
        return util.send(res);
    }
}

// const updatedSoftware = async(req, res) => {
//     const alteredSoftware = req.body;
//     const { software_id } = req.params;
//     if (!Number(software_id)) {
//         util.setError(400, ' Please input a valid id');
//         return util.send(res);
//     }
//     try {
//         const updateSoftware = await SoftwareService.updateSoftware(software_id, alteredSoftware);
//         if (!updateSoftware) {
//             util.setError(404, `Cannot find software with the id: ${alteredSoftware.software_id}`);
//         } else {
//             util.setSuccess(200, 'Software updated', updateSoftware);
//         }
//         return util.send(res);
//     } catch (error) {
//         util.setError(404, error.message);
//         return util.send(res);
//     }
// }

const updatedSoftware = async(req, res) => {
    const alteredSoftware = req.body;
    const { software } = req.params;
    if (!req.body.latest_version || !req.body.name) {
        util.setError(400, 'Please provide complete details');
        return util.send(res);
    }
    try {
        const updateSoftware = await SoftwareService.updateSoftware(software, alteredSoftware);
        if(!updateSoftware) {
            util.setError(404, `Cannot find ${software} software`);
        } else {
            util.setSuccess(200, `The software has been updated`, updateSoftware);
        }
        return util.send(res);
    } catch (error) {
        util.setError(404, error.message);
        return util.send(res);
    }
}

const getLatestSoftware = async(req, res) => {
    try {
        const latestSoftware = await SoftwareService.getLatestSoftware();
        if(latestSoftware) {
            util.setSuccess(200, `This is the info`, latestSoftware);
        } else {
            util.setSuccess(404, 'some error');
        }
        return util.send(res);
    } catch (error) {
        util.setError(404, error.message);
        return util.send(res);
    }
}

// const deleteSoftware = async(req, res) => {
//     const { software_id } = req.params;
    
//     if (!Number(software_id)) {
//         util.setError(400, 'Please provide a numeric value for id');
//         return util.send(res);
//     }

//     try {
//         const softwareToDelete = await SoftwareService.deleteSoftware(software_id);
//         if (softwareToDelete) {
//             util.setSuccess(200, 'Software deleted');
//         } else {
//             util.setError(404, `Software with the id: ${software_id} cannot be found`);
//         }
//         return util.send(res);
//     } catch (error) {
//         util.setError(400, error.message);
//         return util.send(res);
//     }
// }


const deleteSoftware = async(req, res) => {
    const { software } = req.params;

    try {
        const softwareToDelete = await SoftwareService.deleteSoftware(software);

        if (softwareToDelete) {
            util.setSuccess(200, 'Software deleted');
        } else {
            util.setError(404, `${software} software cannot be found`);
        }
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
    }
}

module.exports = {
    getAllSoftwares,
    addSoftware,
    updatedSoftware,
    deleteSoftware,
    getLatestSoftware
}