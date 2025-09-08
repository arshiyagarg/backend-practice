import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/post",protectRoute,createPost)

export default router;