import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"; 
import Person from "./models/person.js"
passport.use(new LocalStrategy (async(username,password,done)=>{
    try{
       console.log("Received credentials");
       const user=await Person.findOne({username:username})
       if(!user){
         return done(null,false,{message: "User not found"});
       }
 
       const isValidPassword =await user.comparePassword(password)
       if(!isValidPassword){
         return done(null,false,{message: "Password not found"});
       }
       else{
        return done(null,user,{message:"User logged in"})
       }
    }
    catch(error) {
     return done(error)
    }
 })) 


 export default passport; 