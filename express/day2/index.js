import express from "express";
import userRouter from "./routers/user.router.js"
const app = express();

app.use("/api/v1/user",userRouter);

const PORT = 3000;


// Custom Middleware
// function SayHiMiddleware(req,res,next){
//     console.log("Say HI from middleware");
//     next();
// }


app.get("/",(req,res) => {
    res.status(200).send("Hello from Server");
})


app.listen(PORT,() => {
    console.log("Hello from Server");
})