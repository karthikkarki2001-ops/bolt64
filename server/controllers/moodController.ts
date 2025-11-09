import { Response } from 'express';
import MoodEntry from '../models/MoodEntry';
import { AuthRequest } from '../middleware/auth';

export const getMoodEntries = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};

    const entries = await MoodEntry.find(filter).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mood entries' });
  }
};

export const createMoodEntry = async (req: AuthRequest, res: Response) => {
  try {
    const entry = new MoodEntry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create mood entry' });
  }
};

export const updateMoodEntry = async (req: AuthRequest, res: Response) => {
  try {
    const entry = await MoodEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update mood entry' });
  }
};

export const deleteMoodEntry = async (req: AuthRequest, res: Response) => {
  try {
    const entry = await MoodEntry.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }
    res.json({ message: 'Mood entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete mood entry' });
  }
};
