import cloudinary from "../lib/cloudinary.js";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json({ filteredUsers });
  } catch (error) {
    console.error("error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage=async(req,res)=>{
    try {
        const {id : userToChatId}= req.params
        const myId=req.user._id;

        const messages=await Message.find({
            $or:[{senderId:myId,receiverId:userToChatId},{senderId:userToChatId,receiverId:myId}]  
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("error in getMessage controller",error.message);
        res.status(500).json({error:"internal server error"});
    }
}

export const sendMessage= async (req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
            const uploadResponse =await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage=new Message({
            senderId:senderId,
            receiverId:receiverId,
            text:text,
            image:imageUrl,
        });
        await newMessage.save();
        //todo:real
        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in getMessage controller",error.message);
        res.status(500).json({error:"internal server error"});
    }
}