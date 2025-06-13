import { generateToken } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { fullName, password, email } = req.body;
    if (!fullName || !password || !email) {
      return res
        .json({ success: false, message: "Fill all the fields" })
        .status(500);
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "User already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullname: fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser?._id, res);
      await newUser.save();
      const userToSend = newUser.toObject();
      delete userToSend.password;
      res
        .status(200)
        .json({ message: "created", success: true, data: userToSend });
    } else {
      res.status(400).json({ message: "Invalid Data", success: false });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({message:"Internal Server Error"})
  }
};

export const login = async (req, res) => {
    try {
        const {email,password} = req.body;
        if (!email || ! password){
            return res.status(400).json({
                success:false,
                message:"All fields required"
            })
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(! isPasswordValid){
            return res.status(404).json({
                success:false,
                message:"Invalid user"
            })
        }
        generateToken(user._id,res);
        const userData=user.toObject();
        delete userData.password;
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: userData
        });
        
    } catch (error) {
        console.log("Error in login Controller",error.message)
        res.status(500).json({
            message:"Internal servor error",
            success:false
        })
    }
};

export const logout = async (req, res) => {

    try {
        res.cookie("jwt","",{maxAge:0,httpOnly: true,sameSite: "strict"})
        res.status(200).json({success:true,message:"Logged Out Successfully"})
        
    } catch (error) {
        console.log("Error in Logout Controller",error.message)
        res.status(500).json({
            message:"Internal Server Error"
        })        
    }

};

export const updateProfile=async(req,res)=>{
    try{
        const {profilePic}=req.body;
        const userId=req.user?._id;
        if(!profilePic){
            return res.status(400).json({
                message:"Profile pic is required",
                success:false
            })
        }
        const upload = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:upload.secure_url},{new:true})
        return res.status(200).json({
            success:true,
            message:"updated profile pic",
            data:updatedUser
        })


    }catch(error){
        console.log("Error from ProfilePic update",error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }
}

export const checkAuth=async(req,res)=>{
try {
    return res.status(200).json(
        req.user
    )
    
} catch (error) {
    console.log("Error in CheckAuth",error)
    return res.status(500).json({
        message:"Internal server error"
    })
    
}
}