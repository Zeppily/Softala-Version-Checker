import database from '../src/models';

const getAllProjects = async() => {
    try {
        return await database.project.findAll();
    } catch (error) {
        throw error;
    }
}

const addProject = async(newProject) => {
    try {
        return await database.project.create(newProject);
    } catch (error) {
        throw error;
    }
}

const updateProject = async(project, updateProject) => {
    try {
        const updatedProject = await database.project.update(updateProject, { 
            where: { name: project } 
        });
        if(updatedProject[0]) {
            return updatedProject;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

const deleteProject = async(project) => {
    try {
        const deletedProject = await database.project.destroy({
            where: { name: project }
        });
        return deletedProject;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProjects,
    addProject,
    updateProject,
    deleteProject
}