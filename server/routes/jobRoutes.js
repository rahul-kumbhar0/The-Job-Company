import express from 'express'
import { getJobById, getJobs } from '../controllers/jobController.js';

const router = express.Router()

// Enhanced error handling for jobs route
router.get('/', async (req, res) => {
    try {
        console.log('Fetching all jobs...');
        const jobs = await getJobs();
        console.log(`Found ${jobs?.length || 0} jobs`);
        
        res.json({ 
            success: true, 
            count: jobs?.length || 0,
            jobs 
        });
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
        console.log('Fetching job by ID:', req.params.id);
        const job = await getJobById(req.params.id);
        
        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: 'Job not found' 
            });
        }
        
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