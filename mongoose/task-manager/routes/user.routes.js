import express from 'express';
import User from "../models/user.model.js"
import { validateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

// deleteUser, 
router.delete("/user/:id", validateUser ,async (req,res) => {
    const {id} = req.params;
    try{
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser){
            return res.send({
                success: false,
                message: "User Id not found"
            })
        }

        return res.send({
            success: true,
            data: deletedUser,
            message: "User deleted successfully"
        })
    } catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
})

// createUser
router.post("/user",async (req,res) => {
    const {name, email} = req.body;
    try{
        const newUser = new User({name, email});
        await newUser.save();

        res.send({
            success: true,
            data: newUser,
            message: "User created successfully"
        })
    } catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
})

// updateUser
router.put("/user/:id",validateUser,async (req,res) => {
    const {id} = req.params;
    const {name, email} = req.body;

    try{
        const updatedUser = await User.findByIdAndUpdate(id,{name, email},{new: true, runValidators: true});

        if(!updatedUser){
            return res.send({
                success: false,
                message: "User Id not found"
            })
        }

        return res.send({
            success: true,
            data: updatedUser,
            message: "User updated successfully"
        })
    } catch(err){
        console.log(err);
        res.send({
            success: false,
            message: err.message
        })
    }
})

// getAllUsers
router.get("/user",async (req,res) => {
    try{
        const users = await User.find();

        if(!users || users.length === 0){
            return res.send({
                success: false,
                message: "No users found"
            })
        }

        return res.send({  
            success: true,
            data: users,
            message: "All users fetched successfully"
        })
    } catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
})

// getUserById
router.get("/user/:id",validateUser,async (req,res) => {
    const {id} = req.params;

    try{
        const user = await User.findById(id);

        if(!user || user.length === 0){
            return res.send({
                success: false,
                message: "No users found"
            })
        }

        return res.send({  
            success: true,
            data: user,
            message: "All users fetched successfully"
        })
    } catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
})

export default router;