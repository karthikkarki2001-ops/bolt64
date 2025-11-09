import { Request, Response } from 'express';
import TherapyModule from '../models/TherapyModule';

export const getAllModules = async (req: Request, res: Response) => {
  try {
    const modules = await TherapyModule.find().sort({ createdAt: -1 });
    res.json(modules);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getModuleById = async (req: Request, res: Response) => {
  try {
    const module = await TherapyModule.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.json(module);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createModule = async (req: Request, res: Response) => {
  try {
    const module = new TherapyModule(req.body);
    await module.save();
    res.status(201).json(module);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateModule = async (req: Request, res: Response) => {
  try {
    const module = await TherapyModule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.json(module);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteModule = async (req: Request, res: Response) => {
  try {
    const module = await TherapyModule.findByIdAndDelete(req.params.id);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.json({ message: 'Module deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleModuleStatus = async (req: Request, res: Response) => {
  try {
    const module = await TherapyModule.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    module.status = module.status === 'Active' ? 'Inactive' : 'Active';
    await module.save();
    res.json(module);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
