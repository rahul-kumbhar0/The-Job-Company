import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database Connected'));

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'job-portal'  // This is correct as per your screenshot
        });
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

export default connectDB;