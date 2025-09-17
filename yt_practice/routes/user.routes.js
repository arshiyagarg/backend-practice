import express from "express";
import { signup, login, updateProfile, subscribe } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login", login)
router.put("/update-profile",protectRoute,updateProfile);
router.post("/subscribe",protectRoute,subscribe);

export default router;