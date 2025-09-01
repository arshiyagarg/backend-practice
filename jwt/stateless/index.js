import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import privateRoutes from "./routes/private.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
}).catch((err) => console.log(`DB connection error: ${err}`));

app.use("/auth",authRoutes);
app.use("/private", privateRoutes);

app.get("/", (req,res) => {
    res.send("Server is running at port " + PORT);
})

app.listen(PORT, () => {
    console.log("Starting server at port ", PORT);
})