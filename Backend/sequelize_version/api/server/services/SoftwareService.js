import database from '../src/models';

class SoftwareService {
    static async getAllSoftwares() {
        try {
            return await database.software.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addSoftware(newSoftware) {
        console.log(newSoftware);
        try {
            return await database.software.create(newSoftware);
        } catch (error) {
            throw error;
        }
    }

    static async updateSoftware(id, updateSoftware) {
        try {
            const softwareToUpdate = await database.software.findOne({
                where: { software_id: Number(id) }
            });

            if (softwareToUpdate) {
                await database.software.update(updateSoftware, { where: { software_id: Number(id) } });

                return updateSoftware;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async deleteSoftware(id) {
        try {
            const softwareToDelete = await database.software.findOne({ where: { software_id: Number(id) } });

            if (softwareToDelete) {
                const deletedSoftware = await database.software.destroy({
                    where: { software_id: Number(id) }
                });
                return deletedSoftware;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default SoftwareService;