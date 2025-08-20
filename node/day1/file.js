const { error } = require("console");
const fs = require("fs")
const os = require("os")

console.log(os.cpus().length)


// Write 


// fs.writeFileSync("./text.txt","File Heading")

// fs.writeFile("./text.txt","Write with async",(err) => {
//     console.log(err)
// })


// Read

// const ref = fs.readFileSync("./text.txt","utf8")
// console.log(ref);

// fs.readFile("./text.txt","utf-8", (error,response) => {
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log(response)
//     }
// })




// Append

// fs.appendFileSync("./text.txt",new Date().toDateString())

// fs.appendFile("./text.txt",`Current Date: ${new Date().toDateString()}\n`, (error,response) => {
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log(response)
//     }
// })
