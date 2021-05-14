import { Router } from 'express';
import SoftwareController from '../controller/SoftwareController';

const router = Router();

router.get('/', SoftwareController.getAllSoftwares);
router.post('/', SoftwareController.addSoftware);
router.put('/:software', SoftwareController.updatedSoftware);
router.delete('/:software', SoftwareController.deleteSoftware);
router.get('/version', SoftwareController.getLatestSoftware);

export default router;