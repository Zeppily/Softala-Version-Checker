import SoftwareService from '../services/SoftwareService';
import Util from '../utils/Utils';

const util = new Util();

const getAllSoftwares = async(req, res) => {
    try {
        const allSoftwares = await SoftwareService.getAllSoftwares();
        console.log(`this is allsoftwares ${allSoftwares}`)
        if (allSoftwares.length > 0) {
            util.setSuccess(200, 'Software retrieved', allSoftwares);
        } else {
            util.setSucess(200, 'No software found');
        }
        return util.send(res);
    } catch (error) {
        util.setError(400, error);
        return util.send(res);
    }
}

const addSoftware = async(req, res) => {
    if (!req.body.name || !req.body.latest_version) {
        util.setError(400, 'Please provide complete details');
        return util.send(res);
    }
    const newSoftware = req.body;
    // console.log(newSoftware);
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

const updatedSoftware = async(req, res) => {
    const alteredSoftware = req.body;
    const { software_id } = req.params;
    if (!Number(software_id)) {
        util.setError(400, ' Please input a valid id');
        return util.send(res);
    }
    try {
        const updateSoftware = await SoftwareService.updateSoftware(software_id, alteredSoftware);
        if (!updateSoftware) {
            util.setError(404, `Cannot find software with the id: ${alteredSoftware.software_id}`);
        } else {
            util.setSuccess(200, 'Software updated', updateSoftware);
        }
        return util.send(res);
    } catch (error) {
        util.setError(404, error);
        return util.send(res);
    }
}

const deleteSoftware = async(req, res) => {
    const { software_id } = req.params;
    
    if (!Number(software_id)) {
        util.setError(400, 'Please provide a numeric value for id');
        return util.send(res);
    }

    try {
        const softwareToDelete = await SoftwareService.deleteSoftware(software_id);
        if (softwareToDelete) {
            util.setSuccess(200, 'Software deleted');
        } else {
            util.setError(404, `Software with the id: ${software_id} cannot be found`);
        }
        return util.send(res);
    } catch (error) {
        util.setError(400, error);
        return util.send(res);
    }
}
module.exports = {
    getAllSoftwares,
    addSoftware,
    updatedSoftware,
    deleteSoftware
}