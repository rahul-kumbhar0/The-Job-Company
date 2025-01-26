import express from 'express'
import { getJobById, getJobs } from '../controllers/jobController.js';

const router = express.Router()

// Add error handling middleware
router.get('/', async (req, res) => {
    try {
        const jobs = await getJobs();
        res.json({ success: true, jobs });
    } catch (error) {
        console.error('Jobs route error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch jobs',
            error: error.message 
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const job = await getJobById(req.params.id);
        res.json({ success: true, job });
    } catch (error) {
        console.error('Job by ID route error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch job',
            error: error.message 
        });
    }
});

export default router;