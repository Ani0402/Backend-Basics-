import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const registerUser=asyncHandler(async(req,res)=>{
   const {username,email,password} = req.body;

   if(!username || !email || !password){
     
    throw new Error("Invalid credentials");
   }

   const userAvailable=await User.findOne({email});
   if(userAvailable){
    throw new Error("User already exists");
   }
    
   const hashedPassword=await bcrypt.hash(password,10);

   const newUser=await User.create({
    username,email,password:hashedPassword
   })

   const savedUser=await newUser.save();
    
   res.status(200).json({message:"user registed",savedUser})

})

const loginUser=asyncHandler(async(req,res)=>{
        const {email,password} = req.body
        if(!email || !password){
            throw new Error("Some fields are missing");
        }

        const user=await User.findOne({email})
        if(user && (await bcrypt.compare(password,user.password))){
            const token=jwt.sign({
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id
                }
            },process.env.ACCESS_TOKEN,{expiresIn:"15m"});
            res.status(200).json({message:"user logged ",token})
        }
        else{
            throw new Error("User credentials not valid");
        }
})

const updateUser=asyncHandler(async(req,res)=>{

})

const deleteUser=asyncHandler(async(req,res)=>{

})

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

export {registerUser, updateUser, deleteUser,loginUser,currentUser};