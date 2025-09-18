import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createComment } from "../controllers/comment.controller.js";

const router = express.Router();
router.post("/",protectRoute,createComment);

export default router;