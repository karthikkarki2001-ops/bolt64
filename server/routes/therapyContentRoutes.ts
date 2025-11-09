import express from 'express';
import {
  getAllContents,
  getContentByTherapyId,
  saveContent,
  publishContent,
  deleteContent
} from '../controllers/therapyContentController';

const router = express.Router();

router.get('/', getAllContents);
router.get('/therapy/:therapyId', getContentByTherapyId);
router.post('/', saveContent);
router.patch('/:id/publish', publishContent);
router.delete('/:id', deleteContent);

export default router;
