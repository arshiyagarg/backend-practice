import { Router } from "express";
import { generateToken } from "../utils/token-utils.js";

const router = Router();

router.get("/generate-token",(req,res) => {
    const token = generateToken();

    res.status(200).send({
        meassge: "Token generated save if for future use",
        token: token
    })
})

router.get("/",(req,res) => {
    res.status(200).send({
        message: "Welcome to the home page"
    })
})

export default router;