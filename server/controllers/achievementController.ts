import { Request, Response } from 'express';
import Achievement from '../models/Achievement';

export const getAchievements = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    let achievement = await Achievement.findOne({ userId });

    if (!achievement) {
      achievement = new Achievement({
        userId,
        achievements: [],
        stats: {
          totalSessions: 0,
          totalMinutes: 0,
          streakDays: 0,
          modulesCompleted: 0
        }
      });
      await achievement.save();
    }

    res.json(achievement);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const unlockAchievement = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { achievementData } = req.body;

    let achievement = await Achievement.findOne({ userId });

    if (!achievement) {
      achievement = new Achievement({
        userId,
        achievements: [],
        stats: {
          totalSessions: 0,
          totalMinutes: 0,
          streakDays: 0,
          modulesCompleted: 0
        }
      });
    }

    const exists = achievement.achievements.find(a => a.id === achievementData.id);
    if (!exists) {
      achievement.achievements.push({
        ...achievementData,
        unlockedAt: new Date()
      });
      await achievement.save();
    }

    res.json(achievement);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateStats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { stats } = req.body;

    let achievement = await Achievement.findOne({ userId });

    if (!achievement) {
      achievement = new Achievement({
        userId,
        achievements: [],
        stats: {
          totalSessions: 0,
          totalMinutes: 0,
          streakDays: 0,
          modulesCompleted: 0
        }
      });
    }

    achievement.stats = { ...achievement.stats, ...stats };
    await achievement.save();

    res.json(achievement);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
