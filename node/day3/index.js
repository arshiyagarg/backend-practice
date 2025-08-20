const EventEmitter = require("events")
const fs = require("fs")

const userEmitter = new EventEmitter()

const eventCount = {
    login: 0,
    logout: 0,
    purchase: 0,
    profileUpdate: 0
}

const LogFile = "eventLog.json"

if(fs.existsSync(LogFile)){
    const data = fs.readFileSync(LogFile,"utf-8")
    Object.assign(eventCount,JSON.parse(data))
}

function saveCounts() {
    fs.writeFileSync(LogFile,JSON.stringify(eventCount,null,2))
}

userEmitter.on("LOGIN",(username) => {
    eventCount.login++
    console.log(`${username} Logged in successfully`)
    saveCounts()
})

userEmitter.on("LOGOUT",(username) => {
    eventCount.logout++
    console.log(`${username} Logged out successfully`)
    saveCounts()
})

userEmitter.on("PURCHASE",(username, item) => {
    eventCount.purchase++
    console.log(`${username} purchased ${item}`)
    saveCounts()
})

userEmitter.on("PROFILE_UPDATE",(username,field) => {
    eventCount.profileUpdate++
    console.log(`${username} updated the profile field: ${field}`)
    saveCounts()
})

userEmitter.on("SUMMARY",()=>{
    console.log(`LOGIN: ${eventCount.login}\nLOGOUT: ${eventCount.logout}\nPURCHASE: ${eventCount.purchase}\nPROFILE UPDATE: ${eventCount.profileUpdate}\n`)
})

// userEmitter.emit("LOGIN","Arshiya")
userEmitter.emit("SUMMARY")