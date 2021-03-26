import { Router } from 'express';
import SoftwareController from '../controller/SoftwareController';

const router = Router();

router.get('/', SoftwareController.getAllSoftwares);
router.post('/', SoftwareController.addSoftware);
router.put('/:software_id', SoftwareController.updatedSoftware);
router.delete('/:software_id', SoftwareController.deleteSoftware);

export default router;