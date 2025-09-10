import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { uploadVideo, updateVideo, getAllVideos, getVideoById, getMyVideos, getCategoryVideos, getVideoByTags, likeVideo, dislikeVideo } from "../controllers/video.controller.js";

const router = express.Router();

router.post("/upload",protectRoute,uploadVideo);
router.put("/update/:id",protectRoute,updateVideo); // only metadata, thumbnail
router.get("/all",protectRoute,getAllVideos);
router.get("/my-videos",protectRoute,getMyVideos);
router.get("/:id",protectRoute,getVideoById);
router.get("/category/:category",protectRoute,getCategoryVideos);
router.get("/tags/:tag",protectRoute,getVideoByTags);
router.post("/like",protectRoute,likeVideo);
router.post("/dislike",protectRoute,dislikeVideo);

export default router;