
import jwt from "jsonwebtoken";
import tokenBlackListModel from "../models/blacklist.model.js";

async function authUser(req,res,next){
    const token=req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message:"Token not provided ."
        })
    }

    const istokenBlacklisted=await tokenBlackListModel.findOne({token});

    if(istokenBlacklisted){
        return res.status(401).json({
            message:"invalid token"
        })
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log("username set by decode is " + decoded.username);
        req.user=decoded;
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).json({
            message:"token inValid"
        })
    }


}

const authMiddleware ={authUser};

export default  authMiddleware ;