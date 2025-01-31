import express from 'express';
import { getJobById, getJobs } from '../controllers/jobController.js';

const router = express.Router();

// Use getJobs directly as a route handler
router.get('/', getJobs);

// If you have a route for getting a job by ID
router.get('/:id', getJobById);

export default router;