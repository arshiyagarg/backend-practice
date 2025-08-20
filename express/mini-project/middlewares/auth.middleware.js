import { validateToken } from "../utils/token-utils.js";

const authMiddleware = (req,res,next) => {
    const token = req.headers['authorization'];
    if(token && validateToken(token)){
        req.user = {name:"Arshiya",id:1};
        next();
    }

    res.status(401).send("User doesnot have access to private data");
}

export default authMiddleware;