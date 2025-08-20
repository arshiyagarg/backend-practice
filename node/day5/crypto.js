const crypto = require("crypto")

const algo = "aes-256-cbc"

const key = crypto.randomBytes(32)

const iv = crypto.randomBytes(16)

function encrypt(text){
    const cipher = crypto.createCipheriv(algo,key,iv)
    let encr = cipher.update(text,"utf-8","hex")
    encr += cipher.final("hex")
    return {
        iv: iv.toString("hex"),
        content: encr
    }
}

function decrypt(text){
    const decipher = crypto.createDecipheriv(algo,key,Buffer.from(text.iv,"hex"))
    let decr = decipher.update(text.content,"hex","utf-8")
    decr += decipher.final("utf-8")
    return decr
}

const psswd = "mySecretPassword"

const encrypted = encrypt(psswd)
console.log("Encrypted: ",encrypted)

const decrypted = decrypt(encrypted)
console.log("Decrypted: ",decrypted)