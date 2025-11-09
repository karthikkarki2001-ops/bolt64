import { Request, Response } from 'express';
import ExposureSession from '../models/ExposureSession';

export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};
    const sessions = await ExposureSession.find(query).sort({ sessionDate: -1 });
    res.json(sessions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSessionById = async (req: Request, res: Response) => {
  try {
    const session = await ExposureSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createSession = async (req: Request, res: Response) => {
  try {
    const session = new ExposureSession(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  try {
    const session = await ExposureSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const session = await ExposureSession.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json({ message: 'Session deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
