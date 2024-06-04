import mongoose from "mongoose";
import express from 'express';

const connectDB=async(req,res)=>{
    try{
        const DB_URL="mongodb://localhost:27017/crud";
        await mongoose.connect(DB_URL);
        console.log("Connected to DB")
    }
    catch(error){
        console.log(error);
        console.log("Not connected to DB")
    }
}

export default connectDB;