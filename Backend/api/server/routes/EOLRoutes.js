import { Router } from 'express';
import EOLController from '../controller/EOLController';

const router = Router();

router.get('/', EOLController.getAllEOLs);
router.get('/:project', EOLController.getProjectSpecificEOLs);
router.post('/', EOLController.addEOL);
router.post('/list', EOLController.addEOLList);
router.put('/', EOLController.updatedEOL);
router.delete('/', EOLController.deleteEOL);
router.delete('/all', EOLController.deleteAllEOLs);

export default router;