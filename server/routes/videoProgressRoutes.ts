import express from 'express';
import {
  getAllProgress,
  getProgressById,
  createOrUpdateProgress,
  deleteProgress
} from '../controllers/videoProgressController';

const router = express.Router();

router.get('/', getAllProgress);
router.get('/:id', getProgressById);
router.post('/', createOrUpdateProgress);
router.delete('/:id', deleteProgress);

export default router;
