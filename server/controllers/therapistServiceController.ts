import { Response } from 'express';
import TherapistService from '../models/TherapistService';
import { AuthRequest } from '../middleware/auth';

export const getTherapistServices = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const services = await TherapistService.find(filter);
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch therapist services' });
  }
};

export const createTherapistService = async (req: AuthRequest, res: Response) => {
  try {
    const service = new TherapistService(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create therapist service' });
  }
};

export const updateTherapistService = async (req: AuthRequest, res: Response) => {
  try {
    const service = await TherapistService.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ error: 'Therapist service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update therapist service' });
  }
};

export const deleteTherapistService = async (req: AuthRequest, res: Response) => {
  try {
    const service = await TherapistService.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Therapist service not found' });
    }
    res.json({ message: 'Therapist service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete therapist service' });
  }
};
