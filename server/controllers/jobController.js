import Job from "../models/Job.js";

// Get All Jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ visible: true })
            .populate({ path: 'companyId', select: '-password' });

        res.status(200).json({ success: true, jobs });
    } catch (error) {
        console.error('Jobs route error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch jobs' });
    }
};

// Get Single Job Using JobID
export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id)
            .populate({ path: 'companyId', select: '-password' });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        console.error('Job fetch error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch job' });
    }
};