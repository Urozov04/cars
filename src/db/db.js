import { config } from "../config/index.js";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL); 
        console.log("MongoDb muvaffaqiyatli ulandi");
    } catch (error) {
        console.error("MongoDB ulanishda xatolik", error.message);
        process.exit(1);
    }
};