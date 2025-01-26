import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'

const app = express()

// CORS configuration
app.use(cors({
    origin: ['https://the-job-company.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
}));

app.use(express.json())
app.use(clerkMiddleware())

const startServer = async () => {
    try {
        await connectDB()
        await connectCloudinary()

        // Routes
        app.get('/', (req, res) => res.json({ message: "API Working" }))
        app.post('/webhooks', clerkWebhooks)
        app.use('/api/company', companyRoutes)
        app.use('/api/jobs', jobRoutes)
        app.use('/api/users', userRoutes)

        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ 
                success: false, 
                message: 'Internal Server Error',
                error: process.env.NODE_ENV === 'production' ? {} : err.message
            });
        });

        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
}

startServer();