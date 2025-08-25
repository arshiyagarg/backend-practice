import express from "express"
import session from "express-session"
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/task.routes.js"
import cookieParser from "cookie-parser"

const app = express()
const PORT = 8080;

app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000*60*60*24,
        secure: false 
    }
}))

app.use("/autho",authRoutes);
app.use("/task",taskRoutes);

app.get("/",(req,res) => {
    res.send("Welcome to Task Manager API");
})

app.listen(PORT,()=>{
    console.log(`Server running on PORT: ${PORT}`);
})