import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { uploadVideo, updateVideo, getAllVideos, getMyVideos } from "../controllers/video.controller.js";

const router = express.Router();

router.post("/upload",protectRoute,uploadVideo);
router.put("/update/:id",protectRoute,updateVideo); // only metadata, thumbnail
router.get("/all",protectRoute,getAllVideos);
router.get("/my-videos",protectRoute,getMyVideos);
router.get("/:id",protectRoute,getMyVideos);

export default router;