import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { uploadVideo, updateVideo } from "../controllers/video.controller.js";

const router = express.Router();

router.post("/upload",protectRoute,uploadVideo);
router.put("/update/:id",protectRoute,updateVideo); // only metadata, thumbnail

export default router;