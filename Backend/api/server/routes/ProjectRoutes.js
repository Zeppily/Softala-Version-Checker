import { Router } from 'express';
import ProjectController from '../controller/ProjectController';

const router = Router();

router.get('/', ProjectController.getAllProjects);
router.post('/', ProjectController.addProject);
router.put('/:id', ProjectController.updatedProject);
router.delete('/:id', ProjectController.deleteProject);

export default router;