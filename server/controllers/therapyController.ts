import { Response } from 'express';
import TherapyProgress from '../models/TherapyProgress';
import CBTRecord from '../models/CBTRecord';
import GratitudeEntry from '../models/GratitudeEntry';
import TherapySession from '../models/TherapySession';
import { AuthRequest } from '../middleware/auth';

export const getTherapyProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    let progress = await TherapyProgress.findOne({ userId });

    if (!progress) {
      progress = new TherapyProgress({ userId, moduleData: {} });
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch therapy progress' });
  }
};

export const updateTherapyProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const progress = await TherapyProgress.findOneAndUpdate(
      { userId },
      { moduleData: req.body },
      { new: true, upsert: true }
    );

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update therapy progress' });
  }
};

export const getCBTRecords = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const records = await CBTRecord.find(filter).sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch CBT records' });
  }
};

export const createCBTRecord = async (req: AuthRequest, res: Response) => {
  try {
    const record = new CBTRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create CBT record' });
  }
};

export const getGratitudeEntries = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const entries = await GratitudeEntry.find(filter).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gratitude entries' });
  }
};

export const createGratitudeEntry = async (req: AuthRequest, res: Response) => {
  try {
    const entry = new GratitudeEntry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create gratitude entry' });
  }
};

export const getTherapySessions = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, moduleName } = req.query;
    const filter: any = {};
    if (userId) filter.userId = userId;
    if (moduleName) filter.moduleName = moduleName;

    const sessions = await TherapySession.find(filter).sort({ completedAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch therapy sessions' });
  }
};

export const createTherapySession = async (req: AuthRequest, res: Response) => {
  try {
    const session = new TherapySession(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create therapy session' });
  }
};
