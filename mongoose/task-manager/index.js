import express from "express";
import connectTaksDB from "./databases/tasks.js";
import connectUserDB from "./databases/users.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import connectDB from "./databases/db.js";  

const app = express();
const PORT = 3000;

app.use(express.json());
connectDB();
// connectTaksDB();
// connectUserDB();

app.use("/api",userRoutes);
app.use("/api",taskRoutes);


app.put("/",(req,res) => {
    res.send(`Server is running at port ${PORT}`)
})

app.listen(PORT, () => {
    console.log("Starting server at port ", PORT);
})