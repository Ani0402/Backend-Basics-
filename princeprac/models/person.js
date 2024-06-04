import mongoose from "mongoose";
import bcrypt from "bcrypt";
const personSchema=new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   age:{
    type:Number,
    required:true
   },
   work:{
    type:String,
    enum:["chef","waiter","manager"],
    required:true
   },
   mobile:{
    type:Number,
    required:true
   },
   email:{
    type:String,
    unique:true,
    required:true
   },
   salary:{
    type:Number
   },
   username:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true
   }

})

personSchema.pre('save', async function(next) {
   const person = this;
   if (!person.isModified('password')) return next();
   try {
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(person.password, salt);

       person.password = hashedPassword;
       next();
   } catch (error) {
         return next(error);
   }
});


personSchema.methods.comparePassword=async function(newPassword){
   try{
      const isMatch=await bcrypt.compare(newPassword,this.password);
      return isMatch;
   }
   catch(error){
      throw error;
   }
}


const Person=mongoose.model('Person',personSchema);

export default Person;