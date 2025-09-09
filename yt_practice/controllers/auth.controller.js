import bcrypt from "bcryptjs"
import cloudinary from "../config/cloudinary.config.js";
import User from "../models/user.model.js";

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