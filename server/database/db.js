import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            // You can remove useUnifiedTopology and useNewUrlParser
            // They are not needed in the latest versions of the driver
        });
        console.log("Database Connected");
    } catch (error) {
        console.log("Database connection error:", error);
    }
};
