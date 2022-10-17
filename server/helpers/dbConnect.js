import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

 const connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch(err){
        console.log("Connection to MongoDB has failed", err.message);
    }
}

export default connectDB