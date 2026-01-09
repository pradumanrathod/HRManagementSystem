import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async(req,res)=>{
    const{name, email, password, role}=req.body;

    const userExists= await User.findOne({email});
    if(userExists) return res.status(400).json({message: "user already exists"});

    const user= await User.create({name, email, password, role}); //user.create : Validation: It checks the data against your userSchema ,
    // Instantiation: It creates a new "instance" (a document) of your User model, Persistence: It sends the data to MongoDB and saves it.

    res.status(201).json({
        token:generateToken(user._id,user.role),
        role:user.role,
    })
}

export const login = async(req,res)=>{
    const {email,password}= req.body;

    const user = await User.findOne({email});
    if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({message:"invalid credentials"});
    }

    res.json({
        token:generateToken(user._id, user.role),
        role: user.role,
    })
}