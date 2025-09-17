import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { add, deleteComment, getAllComments, updateComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/add",protectRoute,add)
router.delete("/:commentId",protectRoute,deleteComment);
router.put("/:commentId",protectRoute,updateComment);
router.get("/:videoId",protectRoute,getAllComments);

export default router;