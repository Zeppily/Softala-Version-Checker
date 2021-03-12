import SoftwareService from '../services/SoftwareService';
import Util from '../utils/Utils';

const util = new Util();

class SoftwareController {
    static async getAllSoftwares(req, res) {
        try {
            const allSoftwares = await SoftwareService.getAllSoftwares();
            if(allSoftwares.length > 0) {
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

    static async addSoftware(req, res) {
        if (!req.body.name || !req.body.latest_version) {
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
        const newSoftware = req.body;
        console.log(newSoftware);
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

    static async updatedSoftware(req, res) {
        const alteredSoftware = req.body;
        //const { id } = req.params;
        // if (!Number(id)) {
        //     util.setError(400, ' Please input a valid id');
        //     return util.send(res);
        // }
        try {
            const updateSoftware = await SoftwareService.updateSoftware(alteredSoftware);
            if(!updateSoftware) {
                util.setError(404, `Cannot find software with the name: ${alteredSoftware.name}`);
            } else {
                util.setSuccess(200, 'Software updated', updateSoftware);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteSoftware(req, res) {
        const deletedSoftware = req.body;

        // if (!Number(id)) {
        //     util.setError(400, 'Please provide a numeric value for id');
        //     return util.send(res);
        // }

        try {
            const softwareToDelete = await SoftwareService.deleteSoftware(deletedSoftware);

            if (softwareToDelete) {
                util.setSuccess(200, 'Software deleted');
            } else {
                util.setError(404, `Software with the name ${deletedSoftware.name} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default SoftwareController;