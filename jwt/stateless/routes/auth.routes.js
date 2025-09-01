import express from 'express';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/signup",async (req,res) => {
    const {username, password} = req.body;

    try{
        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            })
        }

        const newUser = new User({username, password});
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "user created successfully",
            user: newUser
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    try{
        const existingUser = await User.findOne({username});

        if(!existingUser){
            return res.status(401).json({
                success: false,
                message: "Invalid username or password - Username not found"
            })
        }

        const isMatch = existingUser.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid username or password - Invalid password"
            })
        }

        const token = jwt.sign({id: existingUser._id, username: existingUser.username}, process.env.JWT_SECRET, {expiresIn: "1h"})
        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})

export default router;