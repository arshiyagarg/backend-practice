const http = require("http")
const fs = require("fs")
const {Transform, pipeline} = require("stream")
const { ppid } = require("process")


const server = http.createServer((req,res) => {

    // ------------- Read --------------
    // ------ Downloading file in a bad way

    // const file = fs.readFileSync("sample.txt")


    // ------ Downloading file in a good way (using stream)
    // const readableStream = fs.createReadStream("sample.txt")
    // readableStream.pipe(res)
    // res.end()

    // ------------- Read & Write --------------
    // ------ Reading and Writing in a bad way
    // const file = fs.writeFileSync("sample.txt")
    // fs.writeFileSync("output.txt",file)

    // ------ Reading and Writing file in a good way (using stream)
    // const readableStream = fs.createReadStream("sample.txt")
    // const writeableStream = fs.createWriteStream("output.txt")

    // readableStream.on("data",(chunk) => {
    //     console.log("CHUNK: ",chunk)
    //     writeableStream.write(chunk)
    // })




    // ------------- String Processing --------------
    // ------ Bad Approach
    // const readableStream = fs.createReadStream("sample.txt")
    // const writeStream = fs.createWriteStream("output.txt")


    // readableStream.on("data",(chunk) => {
    //     const str = chunk.toString().toUpperCase().replaceAll(/ipsum/gi,"Arshiya") 
    //     writeStream.write(str)
    // })


    // ------ Using transform 
    const readableStream = fs.createReadStream("sample.txt")
    const writeStream = fs.createWriteStream("output.txt")
    const transformStream = new Transform({
        transform(chunk,encoding,callback){
            const str = chunk.toString().toUpperCase().replaceAll(/ipsum/gi,"Arshiya") 
            callback(null,str)
        }
    }) 

    // method - 1
    // readableStream.pipe(transformStream).write(writeStream)
    // method - 2
    pipeline(readableStream,transformStream,pipeline, (err) => {console.log(err)})
    res.end()
})


server.listen(8080,() => {
    console.log("The server is initiate at",8080)
})
