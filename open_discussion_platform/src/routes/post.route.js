import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPost, deletePost, getAllPosts, updatePost, getPostById } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/",protectRoute,createPost)
router.get("/",protectRoute,getAllPosts);
router.get("/:postId",protectRoute,getPostById);
router.put("/:postId",protectRoute,updatePost);
router.delete("/:postId",protectRoute,deletePost)

export default router;