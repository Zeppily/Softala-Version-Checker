import EOLService from '../services/EOLService';
import Util from '../utils/Utils';

const util = new Util();

class EOLController {
    static async getAllEOLs(req, res) {
        try {
            const allEOLs = await EOLService.getAllEOLs();
            if(allEOLs.length > 0) {
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

    static async addEOL(req, res) {
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

    static async updatedEOL(req, res) {
        const alteredEOL = req.body;
        //const { id } = req.params;
        // if (!Number(id)) {
        //     util.setError(400, ' Please input a valid id');
        //     return util.send(res);
        // }
        try {
            const updateEOL = await EOLService.updateEOL(alteredEOL);
            if(!updateEOL) {
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

    static async deleteEOL(req, res) {
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
}

export default EOLController;