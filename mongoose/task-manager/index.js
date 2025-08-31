import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import connectDB from "./config/db.js";  
import session from "express-session";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000}
}))

app.use("/api",userRoutes);
app.use("/api",taskRoutes);


app.get("/",(req,res) => {
    console.log("Session: ", req.session);
    res.send(`Server is running at port ${PORT}`)
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Starting server at port ", PORT);
    })
}).catch((err) => {
    console.log("Failed to connect to DB", err);
})