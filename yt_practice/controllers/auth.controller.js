import bcrypt from "bcryptjs"
import cloudinary from "../config/cloudinary.config.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req,res) => {
    try{
        console.log("Request is coming");
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        console.log(hashedPassword);
        const uploadImage = await cloudinary.uploader.upload(req.files.logoUrl.tempFilePath);

        console.log("Upload image: ",uploadImage);

        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            channelName: req.body.channelName,
            phone: req.body.phone,
            logoUrl: uploadImage.secure_url,
            logoId: uploadImage.public_id
        })

        let user = await newUser.save();

        res.status(201).json({
            user
        })
    } catch(error){
        console.log("something went wrong in signup");
        res.status(400).send({message: "Internal Server error"});
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;
    try{
        if(!email || !password){
            return res.json({message: "Invalid Credentials"});
        }
        const existingUser = await User.findOne({email:req.body.email});
        if(!existingUser){
            return res.status(404).json({message: "No such user found"});
        }
        console.log("Existing user: ",existingUser);

        const isValidUser = await bcrypt.compare(req.body.password,existingUser.password);
        if(!isValidUser){
            return res.json({message: "Invalid Credentials"});
        }
        console.log("valid user: ",existingUser);
        
        const token = jwt.sign({
            _id: existingUser._id,
            channelName: existingUser.channelName,
            email: existingUser.email,
            phone: existingUser.phone,
            logoId: existingUser.logoId
        },process.env.JWT_TOKEN,{expiresIn:"7d"});


        res.status(200).json({
            _id: existingUser._id,
            channelName: existingUser.channelName,
            email: existingUser.email,
            phone: existingUser.phone,
            logoId: existingUser.logoId,
            logoUrl: existingUser.logoUrl,
            token: token,
            subscribers: existingUser.subscribers,
            subscribedChannels: existingUser.subscribedChannels
        })
    } catch(error){
        console.log("something went wrong in login");
        res.status(400).send({message: "Internal Server error"});
    }
}