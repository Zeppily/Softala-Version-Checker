import { Router } from 'express';
import ProjectSoftwareController from '../controller/ProjectSoftwareController';

const router = Router();

router.get('/all', ProjectSoftwareController.getAllProjectSoftwares);
router.get('/:project', ProjectSoftwareController.getAllProjectSpecificSoftware);
router.post('/', ProjectSoftwareController.addProjectSoftware);
router.post('/list', ProjectSoftwareController.addListProjectSoftware);
router.put('/', ProjectSoftwareController.updatedProjectSoftware);
router.delete('/', ProjectSoftwareController.deleteProjectSoftware);

export default router;