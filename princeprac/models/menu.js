import mongoose from "mongoose";

const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:["sweet","sour","spicy"],
        required:true
    }
})

 const Menu=mongoose.model("Menu",menuSchema)
 export default Menu;