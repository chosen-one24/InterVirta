
import mongoose from "mongoose";

const blackListModelSchema=new mongoose.Schema({
    token:{
            type:String,
            required:[true,"token required to blacklist"]
        },
    },
    {timestamps:true}
);


const tokenBlackListModel=mongoose.model("blackListTokens",blackListModelSchema);


export default tokenBlackListModel;