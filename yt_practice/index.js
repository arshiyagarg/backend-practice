import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

import userRoutes from "./routes/user.routes.js";
import videoRoutes from "./routes/video.routes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

const PORT = process.env.PORT || 8080;

app.get("/",(req,res) => {
    res.status(201).send("Server is up!");
})

app.use("/api/user",userRoutes);
app.use("/api/video",videoRoutes);

connectDB();

app.listen(PORT,() => {
    console.log("The server is running");
})