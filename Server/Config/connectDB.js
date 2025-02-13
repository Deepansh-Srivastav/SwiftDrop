import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URL = process.env.MONGODB_URL

if (!MONGO_URL) {
    throw new Error(
        "No MongoDB URL found"
    )
}

export default async function connectDB() {
    try {    
        await mongoose.connect(MONGO_URL)
        console.log("DB Connected");
    }
    catch (error) {
        console.log("MongoDB Connection Error - ", error); 
        process.exit(1) 
    }
}
