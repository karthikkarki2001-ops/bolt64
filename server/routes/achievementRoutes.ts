import express from 'express';
import {
  getAchievements,
  unlockAchievement,
  updateStats
} from '../controllers/achievementController';

const router = express.Router();

router.get('/:userId', getAchievements);
router.post('/:userId/unlock', unlockAchievement);
router.put('/:userId/stats', updateStats);

export default router;
