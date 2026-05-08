import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { sendMail } from "../services/mail.service.js";
import { query } from "express-validator";
import bcrypt from "bcryptjs";


export async function register(req, res) {
    const { username, email, password } = req.body;
    const isUserExitsByEmail=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(isUserExitsByEmail){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const user=await userModel.create({
        username,
        email,
        password
    })

    const emailVarificationToken=jwt.sign({
        email:user.email,
    },process.env.JWT_SECRET)
   
    await sendMail({
        to:user.email,
        subject:"Welcome to perplexity",
        html:`<h1>Hello ${user.username}<h1/>,
        <p>Welcome to perplexity</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVarificationToken}">Click here to varify your email</a>
        <p>Thank you</p>
        <p>Perplexity Team</p>
        `
    })
    res.status(201).json({
        message:"User created successfully",
        success:true,
        user:{
            id:user.id,
            username:user.username,
            email:user.email
        }
    })
}

export async function emailVarify(req,res) {
    const {token}=req.query;
    try{
     const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
     const user=await userModel.findOne({email:decodedToken.email});
    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }
    user.verified=true;
    await user.save();
    
    const html=`<h1>Email verify successfull <h1/>
    <p>Your Email is varified successfully You can now login</p>
    <a href="http://localhost:3000/login">Click here to login</a>
    <p>Thank you</p>
    `
    res.send(html);
    }catch(error){
        return res.status(200).json({
        message:"Email varify successfull",
        success:true,
        err:"Invalid token"
    })
    }
 
  
}
export async function login(req,res) {
    const {email,password}=req.body;
    const user=await userModel.findOne({
        email
    }).select("+password");
    if(!user){
        return res.status(400).json({
            message:"User not found",
            success:false,
            err:"User not found"
        })
    }
    const isPasswordCorrect=await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        return res.status(400).json({   
            message:"Invalid password",
            success:false,
            err:"Invalid password"
        })
    }
    if(!user.verified){
        return res.status(400).json({
            message:"Email not varified",
            success:false,
            err:"Email not varified"
        })
    }

    const token=jwt.sign({
        id:user._id,
        username:user.username,
        
    },process.env.JWT_SECRET,{expiresIn:"7d"})
    res.cookie("token",token)
    res.status(200).json({
        message:"Login successfull",
        success:true,
        user:{
            id:user.id,
            username:user.username,
            email:user.email
        }
    })

}

export async function getMe(req,res){
    const userId=req.user.id;
    const user=await userModel.findById(userId).select("-password");
    if(!user){
        return res.status(400).json({
            message:"User not found",
            success:false,
            err:"User not found"
        })
    }
    res.status(200).json({
        message:"User found",
        success:true,
        user
    })
}