import database from '../src/models';

class EOLService {
    static async getAllEOLs() {
        try {
            return await database.EOL.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addEOL(newEOL) {
        console.log(newEOL)
        try {
            return await database.EOL.create(newEOL);
        } catch (error) {
            throw error;
        }
    }

    static async updateEOL(updateEOL) {
        console.log(updateEOL);
        let name = updateEOL.software_name;
        let version = updateEOL.version
        try {
            const eolToUpdate = await database.EOL.findOne({
                where: {
                    software_name: name,
                    version: version
                }
            });
            console.log(eolToUpdate)

            if (eolToUpdate) {
                await database.EOL.update(updateEOL, { 
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

    static async deleteEOL(deleteEOL) {
        let name = deleteEOL.software_name;
        let version = deleteEOL.version
        
        console.log(`This is the name: ${name} and this is the version ${version}`)
        try {
            const eolToDelete = await database.EOL.findOne({
                where: {
                    software_name: name,
                    version: version
                }
            });
            console.log(`this is the eol to delete ${eolToDelete}`)
            if (eolToDelete) {
                const deletedEOL = await database.EOL.destroy({
                    where: {
                        software_name: name,
                        version: version
                    }
                });
                return deletedEOL;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default EOLService;