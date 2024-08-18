import express from 'express';
import { createSet, getSets, deleteSet, getSetImageUrl, getSetImageByIndex, getSetDetails } from '../controllers/setController.js';

const router = express.Router();

router.get('/sets', getSets);
router.post('/sets', createSet);
router.delete('/sets/:id', deleteSet);
router.get('/sets/:id/images', getSetImageUrl);
router.get('/sets/:setId/images/index/:index', getSetImageByIndex);
router.get('/sets/:id/details', getSetDetails);
export default router;