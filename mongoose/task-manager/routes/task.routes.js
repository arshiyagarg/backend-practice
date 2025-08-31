import express from 'express';
import { validateUser } from '../middleware/auth.middleware.js';
import { addTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller.js';

const router = express.Router();

router.post("/task",validateUser, addTask);
router.get("/task",validateUser, getTasks);
router.put("/task",validateUser, updateTask);
router.delete("/task",validateUser, deleteTask);

export default router;