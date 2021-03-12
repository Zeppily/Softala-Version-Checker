import database from '../src/models';

class ProjectService {
    static async getAllProjects() {
        try {
            return await database.Project.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addProject(newProject) {
        console.log(newProject);
        try {
            return await database.Project.create(newProject);
        } catch (error) {
            throw error;
        }
    }

    static async updateProject(id, updateProject) {
        try {
            const projectToUpdate = await database.Project.findOne({
                where: {project_id: Number(id) }
            });

            if (projectToUpdate) {
                await database.Project.update(updateProject, { where: { project_id: Number(id) } });

                return updateProject;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async deleteProject(id) {
        try {
            const projectToDelete = await database.Project.findOne({ where: { project_id: Number(id) } });

            if (projectToDelete) {
                const deletedProject = await database.Project.destroy({
                    where: {project_id: Number(id) }
                });
                return deletedProject;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default ProjectService;