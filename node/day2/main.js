const http = require("http")
const fs = require("fs")

const PORT = 8080

const myServer = http.createServer((request,response) => {
    const LOG = `${Date.now()}: & from ${request.url} new request receieved\n`;

    fs.appendFile("log.txt",LOG,(err) => {
        if(err){
            console.error("Error writing to the log file: ",err);
            response.statusCode = 500;
            response.end("Internal Server Error");
            return;
        }

        response.end("Hello from Server");
    })

})

myServer.listen(PORT, () => {
    console.log("Starting the server")
})