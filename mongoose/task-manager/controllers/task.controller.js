import { createTask, getTasksByUserId, updateTaskById, deleteTaskById} from "../services/task.service.js";

export const addTask = async (req, res) =>{
    try{
        const {title, description} = req.body;
        const userId = req.session.userId;
        
        const newTask = await createTask(title, description, userId);
        res.status(201).send({
            success: true,
            data: newTask,
            message: "Task created successfully"
        })
    } catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
}

export const getTasks = async (req, res) => {
    try{
        const userId = req.session.userId;
        const tasks = await getTasksByUserId(userId);
        res.status(200).send({
            success: true,
            data: tasks,
            message: "Tasks fetched successfully"
        })
    } catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
}

export const updateTask = async (req, res) => {
    const {id, title, description} = req.body;
    try{
        const updatedTask = await updateTaskById(id, title, description);
        res.status(200).send({
            success: true,
            data: updatedTask,
            message: "Task updated successfully"
        })  
    } catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
}

export const deleteTask = async (req, res) => {
    const {id} = req.body;
    try{
        const deletedTask = await deleteTaskById(id);
        res.status(200).send({
            success: true,
            data: deletedTask,
            message: "Task deleted successfully"
        })  
    } catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }   
}