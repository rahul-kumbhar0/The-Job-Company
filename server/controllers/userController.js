import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import { v2 as cloudinary } from "cloudinary"
import { clerkClient } from "@clerk/clerk-sdk-node"

// Get User Data with auto-creation if not exists
export const getUserData = async (req, res) => {
    const userId = req.auth.userId;
    console.log("getUserData - userId:", userId);

    try {
        let user = await User.findById(userId);

        // If user doesn't exist, create new user from Clerk data
        if (!user) {
            console.log("getUserData - Creating new user");
            try {
                // Fetch user data from Clerk
                const clerkUser = await clerkClient.users.getUser(userId);
                
                user = await User.create({
                    _id: userId,
                    name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
                    email: clerkUser.emailAddresses[0]?.emailAddress,
                    image: clerkUser.imageUrl || '',
                });

                console.log("getUserData - New user created:", user);
            } catch (error) {
                console.log("getUserData - Error creating user:", error.message);
                return res.json({ success: false, message: 'Error creating user' });
            }
        }

        console.log("getUserData - user found/created:", user);
        res.json({ success: true, user });

    } catch (error) {
        console.log("getUserData - error:", error.message);
        res.json({ success: false, message: error.message })
    }
}
// Apply For Job
export const applyForJob = async (req, res) => {

    const { jobId } = req.body

    const userId = req.auth.userId

    try {

        console.log("applyForJob - userId:", userId);
        console.log("applyForJob - jobId:", jobId);

        const isAlreadyApplied = await JobApplication.find({ jobId, userId });

        console.log("applyForJob - isAlreadyApplied:", isAlreadyApplied);

        if (isAlreadyApplied.length > 0) {
            console.log("applyForJob - Already Applied");
            return res.json({ success: false, message: 'Already Applied' })
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            console.log("applyForJob - Job Not Found");
            return res.json({ success: false, message: 'Job Not Found' })
        }

        console.log("applyForJob - JobData:", jobData);

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        console.log("applyForJob - Applied Successfully");
        res.json({ success: true, message: 'Applied Successfully'});

    } catch (error) {
        console.log("applyForJob - error:", error.message);
        res.json({ success: false, message: error.message })
    }

}


// Get User Applied Applications Data
export const getUserJobApplications = async (req, res) => {

    try {

        const userId = req.auth.userId

        console.log("getUserJobApplications - userId:", userId);

        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        if (!applications) {
            console.log("getUserJobApplications - No job applications found for this user.");
            return res.json({ success: false, message: 'No job applications found for this user.' })
        }

        console.log("getUserJobApplications - Applications:", applications);

        return res.json({ success: true, applications })

    } catch (error) {
        console.log("getUserJobApplications - error:", error.message);
        res.json({ success: false, message: error.message })
    }

}

// Update User Resume
export const updateUserResume = async (req, res) => {
    try {

        const userId = req.auth.userId

        console.log("updateUserResume - userId:", userId);

        const resumeFile = req.file

        console.log("updateUserResume - resumeFile:", resumeFile);

        const userData = await User.findById(userId)

        console.log("updateUserResume - userData:", userData);

        if (resumeFile) {

            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)

            console.log("updateUserResume - resumeUpload:", resumeUpload);

            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        console.log("updateUserResume - userData updated:", userData);

        return res.json({ success: true, message: 'Resume Updated' });

    } catch (error) {

        console.log("updateUserResume - error:", error.message);

        res.json({ success: false, message: error.message });

    }
}
