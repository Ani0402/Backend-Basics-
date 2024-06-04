import mongoose from "mongoose";

export const connectDB=async()=>{
   try{
      const DB_URL="mongodb+srv://cubickiller777:gOlHT46WWHvrJGsO@cluster0.l8ztdfi.mongodb.net/"
      const connection=await mongoose.connect(DB_URL)
      console.log("MongoDB connected:");  
   }
   catch(err){
    console.log("error in connection to database",err);
   }
}

