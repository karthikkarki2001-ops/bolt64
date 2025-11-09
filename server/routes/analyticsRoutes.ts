import express from 'express';
import { trackEvent, getEvents, getDashboardMetrics } from '../controllers/analyticsController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/events', authenticateToken, trackEvent);
router.get('/events', authenticateToken, getEvents);
router.get('/metrics', authenticateToken, getDashboardMetrics);

export default router;
