import mongoose from "mongoose";

const connectDB=async()=>{
    try{
       const DB_URL=process.env.DB_URL;
       const connect=await mongoose.connect(DB_URL)

       console.log("Connected to database successfully");
    }
    catch(error){
        console.log("error in connectDB",error);
    }
}

export default connectDB;