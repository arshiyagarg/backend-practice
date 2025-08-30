import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
connectDB();
app.use("/api",userRoutes);

app.get("/",(req,res) => {
    res.status(PORT).send(`Server is running at port ${PORT}`);
})

app.listen(PORT, ()=>{
    console.log("Starting server at port ", PORT);
})