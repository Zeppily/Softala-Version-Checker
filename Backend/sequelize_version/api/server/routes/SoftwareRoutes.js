import { Router } from 'express';
import SoftwareController from '../controller/SoftwareController';

const router = Router();

router.get('/', SoftwareController.getAllSoftwares);
router.post('/', SoftwareController.addSoftware);
router.put('/', SoftwareController.updatedSoftware);
router.delete('/', SoftwareController.deleteSoftware);

export default router;