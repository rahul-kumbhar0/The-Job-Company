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

app.use(cors({
    origin: ['https://the-job-company.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

app.use(express.json())
app.use(clerkMiddleware())

app.get('/', (req, res) => {
    res.json({ status: 'API is running' })
})

app.use('/api/jobs', jobRoutes);
app.use('/api/company', companyRoutes)
app.use('/api/users', userRoutes)
app.post('/webhooks', clerkWebhooks)

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? null : err.message
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        await connectCloudinary();
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
};

startServer();