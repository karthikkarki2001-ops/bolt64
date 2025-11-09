import express from 'express';
import {
  getTherapyProgress,
  updateTherapyProgress,
  getCBTRecords,
  createCBTRecord,
  getGratitudeEntries,
  createGratitudeEntry,
  getTherapySessions,
  createTherapySession
} from '../controllers/therapyController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/progress/:userId', authenticateToken, getTherapyProgress);
router.put('/progress/:userId', authenticateToken, updateTherapyProgress);

router.get('/cbt', authenticateToken, getCBTRecords);
router.post('/cbt', authenticateToken, createCBTRecord);

router.get('/gratitude', authenticateToken, getGratitudeEntries);
router.post('/gratitude', authenticateToken, createGratitudeEntry);

router.get('/sessions', authenticateToken, getTherapySessions);
router.post('/sessions', authenticateToken, createTherapySession);

export default router;
