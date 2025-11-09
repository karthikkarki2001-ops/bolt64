import { Request, Response } from 'express';
import TherapyContent from '../models/TherapyContent';

export const getAllContents = async (req: Request, res: Response) => {
  try {
    const contents = await TherapyContent.find().sort({ updatedAt: -1 });
    res.json(contents);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getContentByTherapyId = async (req: Request, res: Response) => {
  try {
    const content = await TherapyContent.findOne({
      therapyId: req.params.therapyId
    }).sort({ version: -1 });

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json(content);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const saveContent = async (req: Request, res: Response) => {
  try {
    const { therapyId, therapyType, contentData, contentId } = req.body;

    if (contentId) {
      const existingContent = await TherapyContent.findById(contentId);
      if (existingContent) {
        existingContent.contentData = contentData;
        existingContent.version += 1;
        await existingContent.save();
        return res.json(existingContent);
      }
    }

    const content = new TherapyContent({
      therapyId,
      therapyType,
      contentData,
      version: 1,
      isPublished: false
    });

    await content.save();
    res.status(201).json(content);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const publishContent = async (req: Request, res: Response) => {
  try {
    const { isPublished } = req.body;
    const content = await TherapyContent.findByIdAndUpdate(
      req.params.id,
      { isPublished },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json(content);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const content = await TherapyContent.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json({ message: 'Content deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
