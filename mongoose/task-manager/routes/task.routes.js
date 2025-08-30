import express from 'express';
import Task from "../models/tasks.model.js";
import { validateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

// createTask
router.post("/task", validateUser, async (req,res) => {
    const {title, description} = req.body;
    const {userId}= req.headers;

    try{
        const newTask = new Task({title, description, userId: userId});
        await newTask.save();

        res.send({
            success: true,
            data: newTask,
            message: "Task created successfully"
        })
    } catch(err){
        console.log(err);
        res.send({
            success: false,
            message: err.message
        })
    }
})

// updateTask
router.put("/task/:id", validateUser, async (req,res) => {
    const {id} = req.params;
    const {title, description} = req.body;

    try{
        const updatedTask = await Task.findByIdAndUpdate(id, {title, description}, {new: true, runValidators: true});
        if(!updatedTask){
            return res.send({
                success: false,
                message: "Task Id not found"
            })
        }

        return res.send({
            success: true,
            data: updatedTask,
            message: "Task updated successfully"
        })
    } catch(err){
        console.log(err);
        res.send({
            success: false,
            message: err.message
        })
    }
})

// update and delete
router.delete("/task/:id", validateUser, async (req, res) => {
    const { id } = req.params;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { status: true },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.send({
                success: false,
                message: "Task Id not found"
            });
        }

        const deletedTask = await Task.findByIdAndDelete(id);

        return res.send({
            success: true,
            data: deletedTask,
            message: "Task status updated and task deleted successfully"
        });

    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            message: err.message
        });
    }
});

// getTasks
router.get("/task", validateUser, async (req,res) => {
    try{
        const tasks = await Task.find();

        if(!tasks || tasks.length === 0){
            return res.send({
                success: false,
                message: "No tasks found"
            })
        }

        return res.send({  
            success: true,
            data: tasks,
            message: "All tasks fetched successfully"
        })
    } catch(err){
        console.log(err);
        res.send({
            success: false,
            message: err.message
        })
    }
})

export default router;