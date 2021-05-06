import ProjectService from '../services/ProjectService';
import Util from '../utils/Utils';

const util = new Util();

const getAllProjects = async(req, res) => {
    try {
        const allProjects = await ProjectService.getAllProjects();
        if(allProjects.length > 0) {
            util.setSuccess(200, 'Projects retrieved', allProjects);
        } else {
            util.setSucess(200, 'No project found');
        }
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
    }
}

const addProject = async(req, res) => {
    if (!req.body.host || !req.body.name || !req.body.username) {
        util.setError(400, 'Please provide complete details');
        return util.send(res);
    }
    const newProject = req.body;
    console.log(newProject);
    try {
        const createdProject = await ProjectService.addProject(newProject);
        util.setSuccess(201, 'Project Added!', createdProject);
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
    }
}

const updatedProject = async(req, res) => {
    const alteredProject = req.body;
    const { project } = req.params;
    if (!req.body.host || !req.body.name || !req.body.username) {
        util.setError(400, 'Please provide complete details');
        return util.send(res);
    }
    try {
        const updateProject = await ProjectService.updateProject(project, alteredProject);
        if(!updateProject) {
            util.setError(404, `Cannot find ${project} project`);
        } else {
            util.setSuccess(200, `The project has been updated`, updateProject);
        }
        return util.send(res);
    } catch (error) {
        util.setError(404, error.message);
        return util.send(res);
    }
}

const deleteProject = async(req, res) => {
    const { project } = req.params;

    // if (!Number(id)) {
    //     util.setError(400, 'Please provide a numeric value for id');
    //     return util.send(res);
    // }

    try {
        const projectToDelete = await ProjectService.deleteProject(project);

        if (projectToDelete) {
            util.setSuccess(200, 'Project deleted');
        } else {
            util.setError(404, `${project} project cannot be found`);
        }
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
    }
}
module.exports = {
    getAllProjects,
    addProject,
    updatedProject,
    deleteProject
}