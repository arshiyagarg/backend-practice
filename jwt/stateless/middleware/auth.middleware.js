import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
        const token = req.header("Authorization");
        if(!token) return res.status(401).json({
            success: false,
            message: "No token provided"
        })
    
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
            req.user = decoded;
            next();
        } catch(err){
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }
}