import express from "express";
import cookieParser from "cookie-parser";

const PORT = 8080;
const app = express();
app.use(cookieParser());

app.get("/",(req,res) => {
    res.cookie("name","express",{
        maxAge: 60000
    });

    res.status(200).send("Hello World");
})

app.get("/product",(req,res) => {
    console.log("Cookies: ",req.cookies);

    if(req.cookies.name && req.cookies.name === "express"){
        res.status(200).send({
            id: 1,
            name: "Arshiya"
        })
    }

    res.status(403).send("Unauthorized User");
})

app.listen(PORT,() => {
    console.log("Starting server on http://localhost:8080")
})