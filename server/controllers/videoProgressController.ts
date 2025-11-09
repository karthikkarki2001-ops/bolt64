import { Request, Response } from 'express';
import VideoProgress from '../models/VideoProgress';

export const getAllProgress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};
    const progress = await VideoProgress.find(query).sort({ lastWatchedAt: -1 });
    res.json(progress);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProgressById = async (req: Request, res: Response) => {
  try {
    const progress = await VideoProgress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({ error: 'Progress not found' });
    }
    res.json(progress);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrUpdateProgress = async (req: Request, res: Response) => {
  try {
    const { userId, videoId } = req.body;

    let progress = await VideoProgress.findOne({ userId, videoId });

    if (progress) {
      progress = await VideoProgress.findByIdAndUpdate(
        progress._id,
        { ...req.body, lastWatchedAt: new Date() },
        { new: true, runValidators: true }
      );
    } else {
      progress = new VideoProgress(req.body);
      await progress.save();
    }

    res.status(progress ? 200 : 201).json(progress);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProgress = async (req: Request, res: Response) => {
  try {
    const progress = await VideoProgress.findByIdAndDelete(req.params.id);
    if (!progress) {
      return res.status(404).json({ error: 'Progress not found' });
    }
    res.json({ message: 'Progress deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
