import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createComment, deleteComment, updateComment, getAllComments } from "../controllers/comment.controller.js";

const router = express.Router();
router.post("/",protectRoute,createComment);
router.put("/:commentId",protectRoute,updateComment);
router.delete("/:commentId",protectRoute,deleteComment);
router.get("/:postId",protectRoute,getAllComments);

export default router;