import Task from "../models/tasks.model.js";

export const createTask = async (title, description, userId) => {
    const newTask = new Task({title, description, userId});
    return await newTask.save();
}

export const getTasksByUserId = async (userId) => {
    return await Task.find({userId});
}

export const updateTaskById = async (id, title, description) => {
    const task = await Task.findById(id);
    if(!task){
        return res.status(404).send({
            success: false,
            message: "Task not found"
        })  
    }

    task.title = title || task.title;
    task.description = description || task.description;
    return await task.save();
}

export const deleteTaskById = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    if(!task){
        return res.status(404).send({
            success: false,
            message: "Task not found"
        })
    }

    return task;
}
