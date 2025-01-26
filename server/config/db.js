import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database Connected'));
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'job-portal',
            retryWrites: true,
            w: 'majority'
        });
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

export default connectDB;