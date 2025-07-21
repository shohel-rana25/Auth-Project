import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/generateToken.js";



export const userRegister=async (req, res)=>{
    try {
        const {username, fullname,dept, session,address,email,password,phone}=req.body;
        const existUser=await User.findOne({email});

        if(existUser)return res.status(400).json({
            message:"User already exists",
        });
        
        const hashpassword=await bcrypt.hash(password,10);
        
        // database save 
        const user=await User.create({
            username,
            fullname,
            dept,
            session,
            phone,
            address,
            email,
            password:hashpassword
            });

        const token=generateToken(user._id);
        
        res.status(200).json({
            id:user._id,
            username, 
            fullname,
            dept, 
            session,
            phone,
            address,
            email,
            password,
        });

    } catch (error) {
        res.status(500).json({
            message:"Server error ",
            error : error.message
        });
    }
}

export const userLogin=async (req, res)=>{
    try {
        const {email, password}=req.body;
        const user=await User.findOne({email});
        if(!user)return res.status(400).json({
            message:"Invalid Email",
        })

        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch)return res.status(400).json({
            message:"Invalid Password",
        })
        
        const token=generateToken(user._id);
        // res.cookie('jwt', token, {
        // httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // sameSite: 'strict',
        // maxAge: 30 * 24 * 60 * 60 * 1000,

        res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'lax',   // 'strict' না দিয়ে 'lax' দাও, বেশিরভাগ ক্ষেত্রে কাজ করে
        maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            dept: user.dept,
            session: user.session,
            phone: user.phone,
            address: user.address,
        }
        });

    } catch (error) {
        res.status(500).json({
          message: "Server error",
          error: error.message,
        });
    }
}

export const userLogout=(req, res)=>{
    try {
        res.clearCookie('jwt', {
            httpOnly:true,
            sameSite:'strict',
            secure:process.env.NODE_ENV='production',
        });

        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
         res.status(500).json({
          message: "Server error",
          error: error.message,
        });
    }
}