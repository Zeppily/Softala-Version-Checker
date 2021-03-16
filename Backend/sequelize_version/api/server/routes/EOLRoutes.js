import { Router } from 'express';
import EOLController from '../controller/EOLController';

const router = Router();

router.get('/', EOLController.getAllEOLs);
router.post('/', EOLController.addEOL);
router.post('/list', EOLController.addEOLList);
router.put('/', EOLController.updatedEOL);
router.delete('/', EOLController.deleteEOL);

export default router;