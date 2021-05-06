import EOLService from '../services/EOLService';
import ProjectSoftwareService from '../services/ProjectSoftwareService';
import ProjectService from '../services/ProjectService';
import SlackService from '../services/SlackService';
import Util from '../utils/Utils';

const util = new Util();

// Return all data from the project_software table
const getAllProjectSoftwares = async(req, res) => {
    try {
        const allProjectSoftwares = await ProjectSoftwareService.getAllProjectSoftwares();
        if (allProjectSoftwares.length > 0) {
            util.setSuccess(200, 'Softwares for all projects retrieved', allProjectSoftwares);
        } else {
            util.setSucess(200, 'No Software found for any project');
        }
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
    }
}

// Return all software listed on a specific project
const getAllProjectSpecificSoftware = async(req, res) => {
    const project = req.params;
    try {
        const allProjectSpecificSoftware = await ProjectSoftwareService.getAllProjectSpecificSoftware(project);
        if (allProjectSpecificSoftware.length > 0) {
            util.setSuccess(200, `Software for ${project} project retrieved`, allProjectSpecificSoftware);
        } else {
            util.setSuccess(200, `No software for for ${project} project`);
        }
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
    }
}

// Add a software to a project
const addProjectSoftware = async(req, res) => {
    if (!req.body.software_name || !req.body.project_name || !req.body.installed_version) {
        util.setError(400, 'Please provide complete details');
        return util.send(res);
    }
    const newProjectSoftware = req.body;
    try {
        const createdProjectSoftware = await ProjectSoftwareService.addProjectSoftware(newProjectSoftware);
        util.setSuccess(201, 'Software for the project Added!', createdProjectSoftware);
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
    }
}

// Add a software to a project
const addListProjectSoftware = async(req, res) => {
    //console.log(req.body)
    // if (!req.body.software_name || !req.body.project_name || !req.body.installed_version) {
    //     util.setError(400, 'Please provide complete details');
    //     return util.send(res);
    // }
    const projectSoftwareList = req.body;
    
    try {
        const createdProjectSoftware = await ProjectSoftwareService.addListProjectSoftware(projectSoftwareList);
        util.setSuccess(201, 'Software for the project Added!', createdProjectSoftware);
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
    }
}

// Update a software listed on a project
const updatedProjectSoftware = async(req, res) => {
    const alteredProjectSoftware = req.body;
    //const { id } = req.params;
    // if (!Number(id)) {
    //     util.setError(400, ' Please input a valid id');
    //     return util.send(res);
    // }
    try {
        const updateProjectSoftware = await ProjectSoftwareService.updateProjectSoftware(alteredProjectSoftware);
        if (!updateProjectSoftware) {
            util.setError(404, `Cannot find software: ${alteredProjectSoftware.software_name} in project: ${alteredProjectSoftware.project_name}`);
        } else {
            util.setSuccess(200, 'Software in project updated', updateProjectSoftware);
        }
        return util.send(res);
    } catch (error) {
        util.setError(404, error.message);
        return util.send(res);
    }
}

// Delete a software from a project
const deleteProjectSoftware = async(req, res) => {
    const deletedProjectSoftware = req.body;
        //const { id } = req.params;

        // if (!Number(id)) {
        //     util.setError(400, 'Please provide a numeric value for id');
        //     return util.send(res);
        // }
    try {
        const projectSoftwareToDelete = await ProjectSoftwareService.deleteProjectSoftware(deletedProjectSoftware);
        if (projectSoftwareToDelete) {
            util.setSuccess(200, 'Software deleted from project');
        } else {
            util.setError(404, `Software ${deletedProjectSoftware.software_name} in ${deletedProjectSoftware.project_name} project cannot be found`);
        }
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
    }
}

const startScan = async(req, res) => {
    const projectNames = req.body.name;
    
    try {
        const startScan = await ProjectSoftwareService.startScan(projectNames);
        const scanEols = await EOLService.scanEOLs();
        const getUptime = await ProjectService.getUptime(projectNames);
        if (startScan) {
            util.setSuccess(200, `Great Success! Except these servers failed: ${JSON.stringify(startScan)} \n${scanEols}\n ${getUptime}`);
        } else {
            util.setError(404, 'Scan was unsuccessful');
        }

        await SlackService.slackBot()
        
        return util.send(res);
    } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
    }
}

module.exports = {
    getAllProjectSoftwares,
    getAllProjectSpecificSoftware,
    addProjectSoftware,
    addListProjectSoftware,
    updatedProjectSoftware,
    deleteProjectSoftware,
    startScan
}