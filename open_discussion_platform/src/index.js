import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import { connectDB } from "./lib/db.config.js";


dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/post",postRoutes);
app.use("/api/comment",commentRoutes);

app.get("/", (req,res) =>  {
    res.status(200).send("Helloo from Server")
})

app.listen(PORT,() => {
    console.log("Server Starting");
    connectDB();
})