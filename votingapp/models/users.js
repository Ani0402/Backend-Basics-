import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema =new mongoose.Schema({
   name:{
    type:String,
    required:true,
   },
   age:{
     type:Number,
     required:true,
   },
   mobile:{
    type:String,
   },
   email:{
    type:String,
   },
   address:{
    type:String,
    required:true,
   },
   aadharNumber:{
    type:Number,
    required:true,
    unique:true,
   },
   password:{
    type:String,
    required:true,
   },
   role:{
    type:String,
    enum:['admin', 'voter'],
    default:'voter',
   },
   isVoted:{
    type:Boolean,
    default:false,
   }
},{timestamps:true});

userSchema.pre('save',async function(next){
    const user=this
    if(!user.isModified('password')) return next();

    try{
        const salt=await bcrypt.genSalt(10) ;

        const hashedPassword=await bcrypt.hash(user.password,salt)

        user.password=hashedPassword
        next();
    }
    catch(error){
      return next(error);
    }
})

userSchema.methods.comparePassword=async function(candidatePassword){
  try{
     const isMatch=await bcrypt.compare(candidatePassword,this.password)
     return isMatch;
  }
  catch(error){
      throw error;
  }
}

const User=mongoose.model('User',userSchema);

export default User;