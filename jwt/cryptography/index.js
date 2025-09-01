import express from 'express';
import crypto from "crypto";


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;


const generateKeys = () =>{
    const {publicKey, privateKey} = crypto.generateKeyPairSync("rsa",{
        modulusLength: 2048,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem"
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem"
        }
    })

    return {publicKey, privateKey};
}

const encrypt = (publicKey, message) => {
    const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(message));
    return encrypted.toString("base64");
}

const decrypt = (privateKey, message) => {
    const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(message, "base64"));
    return decrypted.toString("utf8");
}

const keys = generateKeys();
const publicKey = keys.publicKey;
const privateKey = keys.privateKey;

app.get("/", (req,res) => {
    res.send("Server is running at port " + PORT);
})

app.get("/encrypt",async (req,res) => {
    const {message} = req.body;
    const encryptedData = await encrypt(publicKey, message);

    res.send({
        success: true,
        message: encryptedData
    })
})

app.get("/decrypt",async (req,res) => {
    const {message} = req.body;
    const decryptedData = await decrypt(privateKey, message);

    res.send({
        success: true,
        message: decryptedData
    })
})

app.listen(PORT, () => {
    console.log("Starting server at port ", PORT);
})