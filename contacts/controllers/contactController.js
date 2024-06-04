import asyncHandler from 'express-async-handler';
import Contact from '../models/contact.model.js';


const getContact=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id})
    res.status(200).json({contacts})
})

const getContactById=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404).json({error: 'Contact not found'})
    }
    res.status(200).json({contact})
})

const createContact=asyncHandler(async(req,res)=>{
    const {name,email,phone} = req.body;

    const newUser=await Contact.create({name,email,phone,user_id:req.user.id})

    const savedUser=await newUser.save()
   res.status(200).json({message:"created contact",savedUser})
})

const updateContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404).json({error: 'Contact not found'})
    }

    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(404).json({error: 'All Field are not found'})
    }

    if(contact.user_id.toString() !== req.user.id){
        throw new Error("User do not have permission to update contact")
    }

    const updatedContact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    await updatedContact.save()
    res.status(200).json({message:"updated contact"})
})

const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404).json({error: 'Contact not found'})
    }
    
    if(contact.user_id.toString() !== req.user.id){
        throw new Error("User do not have permission to update contact")
    }

    const updatedContact=await Contact.findByIdAndDelete(req.params.id);
    res.json({message:"deleted contact",updatedContact})
})

export {getContact,createContact,updateContact,deleteContact,getContactById}