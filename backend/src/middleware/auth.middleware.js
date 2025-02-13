import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
export const protectRoute=async(req,res,next)=>
{
    try {
        const token=req.cookies.jwt
        console.log("token inside protected ",token,req)

        if(!token)
        {
            return res.status(401).json({message:"unauthorised "})
        }
        
        const decoded =jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded)
        {
            return res.status(401).json({message:"Unauthhorised-Invalid Token"});
        }
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not Found"});
        }

        req.user=user;
        next()

    } catch (error) {
        console.log("error in the protectRoute",error.message);
        res.status(5000).json({message:"internal server error"});
    }
}