const {Readable, Writable} = require("stream")

const readableStream = new Readable({
    read() {},
})

const writeableStream = new Writable({
    write(streamData){
        console.log("Writing....",streamData)
    }
})

readableStream.on("data",(chunk)=>{
    writeableStream.write(chunk)
    console.log("CHUNK: ",chunk)
})

readableStream.push("Hello")