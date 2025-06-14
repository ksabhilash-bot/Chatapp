import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
export const protectRoute =async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if (!token){
            return res.status(401).json({message:"Unauthorized",success:false})
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({
                success:false,
                message:"Invalid token for Update"
            })
        }
        const user = await User.findById(decode.userId).select("-password")
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"

            })
        }
        req.user = user
        next()
    } catch (error) {
        console.log("Error in cookie from protectRoute",error.message)
        return res.status(500).json({success:false,message:"Server error for token"})

        
    }
}
