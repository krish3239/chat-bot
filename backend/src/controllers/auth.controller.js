import { generateToken } from "../lib/utils.js";
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"

export const signup=async (req,res)=>{
    const{fullName,email,password}=req.body
    try { 
        if(!email||!password||!fullName)
        {
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length<6)
        {
            return res.status(400).json({message:"Password must be atleast 6 characters"})
        }
        const user= await User.findOne({email})

        if(user)
        {
            return res.status(400).json({message:"email already exist"});
        }
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)
        const  newUser=new User({
            fullName:fullName,
            email:email,
            password:hashedPassword,
        })
        if(newUser)
        {
            //generate jwttoken
            generateToken(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })

        }else{
          res.status(400).json({message:"Invaid user data"});  
        }
        
    } catch (error) {
        console.log("error in signup Controller",error.message);
        res.status(500).json({message:"Internal server Error"});
        
    }
};
export const login=(req,res)=>{
    res.send("login route");
};
export const logout=(req,res)=>{
    res.send("logout route");
};