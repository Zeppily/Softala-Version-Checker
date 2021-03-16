import db from '../src/models';
import database from '../src/models';

class EOLService {
    static async getAllEOLs() {
        try {
            return await database.eol.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addEOL(newEOL) {
        console.log(newEOL)
        try {
            return await database.eol.create(newEOL);
        } catch (error) {
            throw error;
        }
    }

    static async addEOLList(eolList, req, res) {
        console.log(eolList)
        try {
            return await database.eol.bulkCreate(eolList, { returning: true, individualHooks: true })
                .then(eols => {
                    //res.json(eols)
                    console.log(eols)
                })
        } catch (error) {
            throw error;
        }
        /*
        db.eol.create({
            software_name: sof_name,
            version: ver,
            eol_date: eoldate,
            activate: true
        }).then(function (dbEol) {
            let eolList = [];

            db.eol.bulkCreate(eolList, {
                returning: true
            }).then(function ())
        })*/
    }

    static async updateEOL(updateEOL) {
        console.log(updateEOL);
        let name = updateEOL.software_name;
        let version = updateEOL.version
        try {
            const eolToUpdate = await database.eol.findOne({
                where: {
                    software_name: name,
                    version: version
                }
            });
            console.log(eolToUpdate)

            if (eolToUpdate) {
                await database.eol.update(updateEOL, {
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
            const eolToDelete = await database.eol.findOne({
                where: {
                    software_name: name,
                    version: version
                }
            });
            console.log(`this is the eol to delete ${eolToDelete}`)
            if (eolToDelete) {
                const deletedEOL = await database.eol.destroy({
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