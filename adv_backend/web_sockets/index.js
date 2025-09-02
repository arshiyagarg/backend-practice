import http from "http"
import { WebSocketServer } from "ws";

const server = http.createServer((req,res) => {
    console.log(new Date() + " Receieved req for : " + req.url);
    res.end("Hi from server")
})

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
    ws.on("error", console.error);

    ws.on("message", function message(data, isBinary){

        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data, {binary: isBinary})
            }
        })
    });

    ws.send("hello! connection from the server");
})


server.listen(8080,() => {
    console.log("Starting server...");
})