import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", authenticateUser , (req,res) => {
    res.status(200).json({message: "You have accessed the private route", user: req.user });
})


export default router;