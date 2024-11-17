import express from 'express';
import { getProjects } from '../controllers/projectController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/projects', authenticateToken, getProjects);

export default router;
