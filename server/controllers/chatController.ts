import { Response } from 'express';
import ChatSession from '../models/ChatSession';
import { AuthRequest } from '../middleware/auth';

export const getChatSession = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    let session = await ChatSession.findOne({ userId }).sort({ updatedAt: -1 });

    if (!session) {
      session = new ChatSession({ userId, messages: [] });
      await session.save();
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat session' });
  }
};

export const saveChatMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const { message } = req.body;

    let session = await ChatSession.findOne({ userId }).sort({ updatedAt: -1 });

    if (!session) {
      session = new ChatSession({ userId, messages: [message] });
    } else {
      session.messages.push(message);
    }

    await session.save();
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save chat message' });
  }
};

export const clearChatSession = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    await ChatSession.findOneAndDelete({ userId });
    res.json({ message: 'Chat session cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear chat session' });
  }
};
