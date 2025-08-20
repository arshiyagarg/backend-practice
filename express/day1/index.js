import express from "express";
import {data} from "./data.js";

const app = express();
app.use(express.json())
const PORT = 8080;

// GET Apis

app.get("/",(req,res) => {
    res.status(200).send("Hello Arshiya!!")
})

app.get("/v1/users",(req, res) => {
    res.status(200).send(data)
})


app.get("/v1/users/:id",(req, res) => {
    const { id } = req.params;
    const parseId = parseInt(id);

    const user = data.find((user) => user.id === parseId);

    if (user) {
        return res.status(200).send(user);  
    }

    res.status(404).send("User not found");
})


// POST apis

app.post("/v1/users/createUser",(req,res)=>{
    const {name, displayName} = req.body;

    const newUser = {
        id: data.length + 1,
        name,
        displayName
    }

    data.push(newUser);

    res.status(201).send({
        message: "New User Created",
        data: newUser
    })
})


// PUT


app.put("/v1/users/:id",(req,res) => {
    const {body, params:{id}} = req;

    const parseId = parseInt(id);

    const userIndex = data.findIndex((user) => user.id === parseId);

    if(userIndex === -1){
        res.status(404).send("User not found!");
    }

    data[userIndex] = {
        id: parseId,
        ...body
    }

    res.status(200).send({
        message: "User is Updated",
        data: data
    })
})


// PATCH

app.patch("/v1/users/:id",(req,res) => {
    const {body, params:{id}} = req;

    const parseId = parseInt(id);

    const userIndex = data.findIndex((user) => user.id === parseId);

    if(userIndex === -1){
        res.status(404).send("User not found!");
    }

    data[userIndex] = {
        ...data[userIndex], ...body
    }

    res.status(200).send({
        message: "User is Updated",
        data: data
    })
})

// DELETE

app.delete("/v1/users/:id",(req,res) => {
    const {id} = req.params;
    const parseId = parseInt(id);

    const userIndex = data.findIndex((user) => user.id == parseId);

    if(userIndex != -1){
        const deletedUser = data[userIndex];

        data.splice(userIndex,1);
        res.status(200).send({
            message: "User Deleted Successfully",
            data: deletedUser
        })
    }

    res.status(404).send("User not Found");
})

app.listen(PORT,() => {
    console.log("Sever started on: ",PORT);
})