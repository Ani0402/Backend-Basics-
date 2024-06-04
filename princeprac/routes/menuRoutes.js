import Menu from "../models/menu.js"
import express from "express";

const router=express.Router();

router.post("/",async(req,res)=>{
    try{
        const data=req.body;

    const newData=new Menu(data);
    const user=await newData.save();

    res.status(200).json({message:"Created successfully ",user})
    }
    catch(error){
        console.log("Error in creating menu item ",error)
    }
})
router.get("/",async(req,res)=>{
    try{
        const data=await Menu.find();

    res.status(200).json({message:"Menu fetched successfully ",data})
    }
    catch(error){
        console.log("Error in creating menu item ",error)
    }
})

router.get("/:tasteType",async(req,res)=>{
   try{
     const tasteType=req.params.tasteType;
     if(tasteType=="sweet" || tasteType=="sour"  || tasteType=="spicy"){ 
        const data=await Menu.find({taste:tasteType});
        res.status(200).json({message:"taste fetched",data});
     }
     else{
        res.status(404).json({message:"taste not fetched",data});
     }
   }
   catch(error){
    console.log(error)
   }
})

export default router;