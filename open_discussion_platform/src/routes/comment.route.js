import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createComment, deleteComment, updateComment } from "../controllers/comment.controller.js";

const router = express.Router();
router.post("/",protectRoute,createComment);
router.put("/:commentId",protectRoute,updateComment);
router.delete("/:commentId",protectRoute,deleteComment);

export default router;