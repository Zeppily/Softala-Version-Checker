import database from '../src/models';

const getAllProjects = async() => {
    try {
        return await database.project.findAll();
    } catch (error) {
        throw error;
    }
}

const addProject = async(newProject) => {
    console.log(newProject);
    try {
        return await database.project.create(newProject);
    } catch (error) {
        throw error;
    }
}

const updateProject = async(id, updateProject) => {
    try {
        const projectToUpdate = await database.project.findOne({
            where: { project_id: Number(id) }
        });

        if (projectToUpdate) {
            await database.project.update(updateProject, { where: { project_id: Number(id) } });

            return updateProject;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

const deleteProject = async(id) => {
    try {
        const projectToDelete = await database.project.findOne({ where: { project_id: Number(id) } });

        if (projectToDelete) {
            const deletedProject = await database.project.destroy({
                where: { project_id: Number(id) }
            });
            return deletedProject;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export {
    getAllProjects,
    addProject,
    updateProject,
    deleteProject
}

// class ProjectService {
//     static async getAllProjects() {
//         try {
//             return await database.project.findAll();
//         } catch (error) {
//             throw error;
//         }
//     }

//     static async addProject(newProject) {
//         console.log(newProject);
//         try {
//             return await database.project.create(newProject);
//         } catch (error) {
//             throw error;
//         }
//     }

//     static async updateProject(id, updateProject) {
//         try {
//             const projectToUpdate = await database.project.findOne({
//                 where: { project_id: Number(id) }
//             });

//             if (projectToUpdate) {
//                 await database.project.update(updateProject, { where: { project_id: Number(id) } });

//                 return updateProject;
//             }
//             return null;
//         } catch (error) {
//             throw error;
//         }
//     }

//     static async deleteProject(id) {
//         try {
//             const projectToDelete = await database.project.findOne({ where: { project_id: Number(id) } });

//             if (projectToDelete) {
//                 const deletedProject = await database.project.destroy({
//                     where: { project_id: Number(id) }
//                 });
//                 return deletedProject;
//             }
//             return null;
//         } catch (error) {
//             throw error;
//         }
//     }
// }

// export default ProjectService;