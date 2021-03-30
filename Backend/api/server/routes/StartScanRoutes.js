import { Router } from 'express';
import ProjectSoftwareController from '../controller/ProjectSoftwareController';

const router = Router();

router.post('/', ProjectSoftwareController.startScan);

export default router;