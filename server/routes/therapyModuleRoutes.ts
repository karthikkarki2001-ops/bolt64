import express from 'express';
import {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
  toggleModuleStatus
} from '../controllers/therapyModuleController';

const router = express.Router();

router.get('/', getAllModules);
router.get('/:id', getModuleById);
router.post('/', createModule);
router.put('/:id', updateModule);
router.delete('/:id', deleteModule);
router.patch('/:id/toggle-status', toggleModuleStatus);

export default router;
