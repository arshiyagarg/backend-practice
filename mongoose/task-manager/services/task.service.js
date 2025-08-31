import Task from "../models/tasks.model.js";

export const createTask = async (title, description, userId) => {
    const newTask = new Task({title, description, userId});
    return await newTask.save();
}

export const getTasksByUserId = async (userId) => {
    return await Task.find({userId});
}