import { config } from "../config/index.js";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL); 
        console.log("Database connected");
    } catch (error) {
        console.error("Error on connecting to database", error.message);
        process.exit(1);
    }
};