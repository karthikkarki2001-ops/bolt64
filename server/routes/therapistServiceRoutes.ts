import express from 'express';
import {
  getTherapistServices,
  createTherapistService,
  updateTherapistService,
  deleteTherapistService
} from '../controllers/therapistServiceController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getTherapistServices);
router.post('/', authenticateToken, createTherapistService);
router.put('/:id', authenticateToken, updateTherapistService);
router.delete('/:id', authenticateToken, deleteTherapistService);

export default router;
