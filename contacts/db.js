// db.js
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const DB_URL = process.env.DB_URL; // Corrected environment variable name
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to DB:", error); // Log the specific error
    }
}

export default connectDB;
