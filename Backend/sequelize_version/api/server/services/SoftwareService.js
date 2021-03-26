import database from '../src/models';

const getAllSoftwares = async() => {
    try {
        return await database.software.findAll();
    } catch (error) {
        throw error;
    }
}

const addSoftware = async(newSoftware) => {
    console.log(newSoftware);
        try {
            return await database.software.create(newSoftware);
        } catch (error) {
            throw error;
        }
}

const updateSoftware = async(id, updateSoftware) => {
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

const deletedSoftware = async(id) => {
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

module.exports = {
    getAllSoftwares,
    addSoftware,
    updateSoftware,
    deletedSoftware
}