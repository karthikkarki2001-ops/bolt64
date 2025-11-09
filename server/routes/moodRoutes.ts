import express from 'express';
import { getMoodEntries, createMoodEntry, updateMoodEntry, deleteMoodEntry } from '../controllers/moodController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getMoodEntries);
router.post('/', authenticateToken, createMoodEntry);
router.put('/:id', authenticateToken, updateMoodEntry);
router.delete('/:id', authenticateToken, deleteMoodEntry);

export default router;
