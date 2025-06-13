import { messageModel } from "../models/messageModel.js";
import User from "../models/userModel.js";
import cloudinary from '../lib/cloudinary.js'
import { getReceiverSocketId,io } from "../lib/socketio.js";


export const getUserForSidebar = async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json({
            filteredUsers,
            success:true
        })
    } catch (error) {
        console.log("Error from getUserfromSidebar",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })        
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId}=req.params
        const myId= req.user._id;

        const messages = await messageModel.find({
            $or:[{senderId:myId,receiverId:userToChatId},{senderId:userToChatId,receiverId:myId}]
        })
        return res.status(200).json({success:true,messages})
        
    } catch (error) {
        console.log("Error in getting message",error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

}

export const sendMessage=async(req,res)=>{
    try {
        const {text,image}= req.body;
        const {id:receiverId}=req.params;
        const myId= req.user._id
        let imageUrl
        if(image){
            const upload = await cloudinary.uploader.upload(image);
            imageUrl=upload.secure_url
        }
        const newMessage = new messageModel({
            senderId:myId,
            receiverId,
            text,
            image:imageUrl
        })
        await newMessage.save()

        const receiverSocketId= getReceiverSocketId(receiverId);
        if(receiverId)
        {
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        return res.status(200).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage",error)
        return res.status(500).json({success:false,message:"Internal server error"})
        
    }

}