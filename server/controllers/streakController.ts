import { Response } from 'express';
import StreakData from '../models/StreakData';
import { AuthRequest } from '../middleware/auth';

export const getStreakData = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    let streak = await StreakData.findOne({ userId });

    if (!streak) {
      streak = new StreakData({
        userId,
        currentStreak: 0,
        lastActivityDate: '',
        longestStreak: 0,
        totalActivities: 0
      });
      await streak.save();
    }

    res.json(streak);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch streak data' });
  }
};

export const updateStreakData = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const today = new Date().toISOString().split('T')[0];

    let streak = await StreakData.findOne({ userId });

    if (!streak) {
      streak = new StreakData({
        userId,
        currentStreak: 1,
        lastActivityDate: today,
        longestStreak: 1,
        totalActivities: 1
      });
    } else {
      const lastDate = new Date(streak.lastActivityDate);
      const todayDate = new Date(today);
      const daysDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === 0) {
        streak.totalActivities += 1;
      } else if (daysDiff === 1) {
        streak.currentStreak += 1;
        streak.lastActivityDate = today;
        streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
        streak.totalActivities += 1;
      } else {
        streak.currentStreak = 1;
        streak.lastActivityDate = today;
        streak.totalActivities += 1;
      }
    }

    await streak.save();
    res.json(streak);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update streak data' });
  }
};
