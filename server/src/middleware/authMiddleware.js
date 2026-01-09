import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req,res,next)=>{
    //   console.log("AUTH HEADER:", req.headers.authorization);

    let token;
    if( req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return res.status(401).json({message:"not authorized, no token"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       // console.log("DECODED:", decoded);

        req.user = await User.findById(decoded.userId).select("-password"); //do not include the hashed password while giving the info for safety
        next();

    } catch(error){
        res.status(401).json({message:"token failed"});
    }
}

export const authorizeRoles=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
         return res.status(403).json({ message: "Access denied" });
        }
        next();
    }
}