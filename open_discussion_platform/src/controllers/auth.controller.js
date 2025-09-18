import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../../../chat-app/backend/src/utils/utils.js";

export const signup = async (req,res) => {
    const {email, fullName, password} = req.body;

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email, 
            password: hashedPassword
        })

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName, 
                email: newUser.email
            })
        }else{
            res.status(400).json({message: "Invalid user data"});
        }

    } catch(err){
        console.log("Error message signup controller: ", err.message);
        res.status(500).json({message: "Internal Server error"});
    }

}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try{
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        generateToken(user._id,res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email : user.email
        })
    } catch(err){
        console.log("Error in login controller: ",err.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const logout = async (req, res) => {
    try{
        res.cookie("jwt","",{maxAge: 0});
        res.status(200).json({message: "Logged Out successfully"})
    } catch(err){
        console.log("Error in logout controller: ",err.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const checkAuth = async (req, res) => {
    try{
        res.status(200).json(req.user);
    } catch(err){
        console.log("Error in updateProfile controller: ",err.message);
        res.status(500).json({message:"Internal server error"});
    }
}