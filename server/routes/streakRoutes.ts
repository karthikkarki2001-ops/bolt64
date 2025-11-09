import express from 'express';
import { getStreakData, updateStreakData } from '../controllers/streakController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/:userId', authenticateToken, getStreakData);
router.post('/:userId', authenticateToken, updateStreakData);

export default router;
