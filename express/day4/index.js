import express from "express"
import session from "express-session";
import cookieParser from "cookie-parser";


const app = express()

app.use(session(
    {
        secret: "mysecret",
        saveUninitialized: false,
        resave: false,
        cookie: { // cookie in session
            maxAge: 1000*60*60*24
        }
    }
))

app.use(cookieParser("codeSnippet"))

const PORT = 3000;

app.get("/home",(req,res) => {
    console.log(req.session);
    console.log(req.session.id);
    res.status(200).send("You are at HOME");
})

app.get("/login",(req,res) => {
    req.session.user = {
        name: "Arshiya",
        email: "arshiya@email.com",
        age: 20
    }

    console.log(req);
    console.log(req.session);
    res.status(200).send("Done login!")
})

app.get("/logout",(req,res) => {
    req.session.destroy();
    res.send("Logged out");
})

app.listen(PORT,() => {
    console.log("Server Loading!!!");
} )