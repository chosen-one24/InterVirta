 
import mongoose, { mongo } from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username Already Taken"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"Account is already created with this mail"],
        required:true,        
    },
    password:{
        type:String,
        required:true
    }
});

const userModel=mongoose.model("users",userSchema);
export default userModel;