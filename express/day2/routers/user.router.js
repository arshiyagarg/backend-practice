import { Router } from "express";

const userRouter = Router();

userRouter.get("/userpage",(req,res) => {
    res.send("User page");
})

userRouter.get("/getAllUser",(req,res) => {
    res.send("getAllUser page");
})

userRouter.get("/getUserByID",(req,res) => {
    res.send("getUserByID page");
})

export default userRouter;