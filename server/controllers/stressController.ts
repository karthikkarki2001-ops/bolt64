import { Request, Response } from 'express';
import StressLog from '../models/StressLog';

export const getAllLogs = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};
    const logs = await StressLog.find(query).sort({ logDate: -1 });
    res.json(logs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLogById = async (req: Request, res: Response) => {
  try {
    const log = await StressLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ error: 'Log not found' });
    }
    res.json(log);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createLog = async (req: Request, res: Response) => {
  try {
    const log = new StressLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateLog = async (req: Request, res: Response) => {
  try {
    const log = await StressLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!log) {
      return res.status(404).json({ error: 'Log not found' });
    }
    res.json(log);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteLog = async (req: Request, res: Response) => {
  try {
    const log = await StressLog.findByIdAndDelete(req.params.id);
    if (!log) {
      return res.status(404).json({ error: 'Log not found' });
    }
    res.json({ message: 'Log deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
