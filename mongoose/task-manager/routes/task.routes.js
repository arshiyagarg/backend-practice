import express from 'express';
import { validateUser } from '../middleware/auth.middleware.js';
import { addTask, getTasks } from '../controllers/task.controller.js';

const router = express.Router();

router.post("/task",validateUser, addTask);
router.get("/task",validateUser, getTasks);

export default router;