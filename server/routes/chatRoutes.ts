import express from 'express';
import { getChatSession, saveChatMessage, clearChatSession } from '../controllers/chatController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/:userId', authenticateToken, getChatSession);
router.post('/:userId', authenticateToken, saveChatMessage);
router.delete('/:userId', authenticateToken, clearChatSession);

export default router;
