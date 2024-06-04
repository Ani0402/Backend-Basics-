import  express  from "express";
import Person from "../models/person.js"
import {jwtAuthMiddleware,genToken} from "./../jwt.js"

const router=express.Router()

router.post('/signup',async(req, res)=>{
   try{
    const data=req.body;

    const newUser=new Person(data); 
    const savedUser=await newUser.save();
    const payload={
        id:savedUser.id,
        username:savedUser.username
     }

   const token=genToken(payload)

   console.log("token generated ",token)
    res.status(200).json({ message: "User successfully saved",savedUser ,token:token });

   }
   catch(error){ 
    console.log("Error in creating user",error)
   }
})

router.post('/login',async (req, res) => {
    try{
      const {username,password}=req.body;
      const user=await Person.findOne({username:username});

      if(!user || (!await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid username or password"})
      }

     const payload={
        id:user.id,
        username:user.username
     }

     const token=genToken(payload)

     console.log("token generated ",token)
    res.status(200).json({ message: "User successfully logged in  ",payload, token:token });

    }
    catch(error){
        console.log(error)
    res.status(500).json({ message: "Internal server error" });
    }
})

router.get('/', jwtAuthMiddleware,async(req, res) => {
    try{
        const data=await Person.find();
        res.status(200).json({ message: "fetched successfully",user:data});

    } 
    catch(error){
       console.log('Error in fetching user',error)
    }
})

router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
         const userData=req.user;

         const id=userData.id;
         const user=await Person.findById(id)

         res.status(200).json({user})
    }
    catch(error){
       console.log(error)
       res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/:workType",async(req,res)=>{
    try{
       const workType=req.params.workType;
       if(workType=="chef" || workType=="manager" || workType=="waiter"){
        const data=await Person.find({work:workType})
        res.status(200).json({message:"User data ",data});
       }
       else{
        res.status(404).json({message:"Work type not found"})
       }
    }
    catch(error){
        console.log(error);
    }
})



export default router;