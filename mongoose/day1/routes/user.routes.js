import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/user",async (req,res) => {
    try{
        const {name, age, weight} = req.body;

        const newUser = new User({name, age, weight});
        await newUser.save();

        res.status(201).send({
            success: true,
            data: newUser,
            message: "User created successfully"
        })

    }
    catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
});

router.get("/user", async (req,res)=>{
    try{
        const users = await User.find();

        res.status(200).send({
            success: true,  
            data: users,
            message: "All users are successfully fetched"
        })
    } catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
});

router.put("/user/:id",async (req,res)=>{
    const {id} = req.params;
    const {name, age, weight} = req.body;

    try{
        const updatedUser = await User.findByIdAndUpdate(id, {name, age, weight},{new: true, runValidators: true})
        
        if(!updatedUser){
            return res.status(401).send({
                success: false,
                message: "User Id not found"
            })
        }

        return res.status(200).send({
            success: true,
            data: updatedUser,
            message: "User updated successfully"
        })
    
    } catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
});

router.delete("/user/:id",async(req,res) => {
    const {id} = req.params;

    try{

        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(401).send({
                success: false,
                message: "User Id not found"
            })
        }

        return res.status(200).send({
            success: true,
            data: deletedUser,
            message: "User deleted successfully"
        })
    } catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
})

export default router;