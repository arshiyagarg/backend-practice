import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async(req,res,next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1] // Using bearer token we have to input it manually in headers 
        if(!token){
            return res.status(401).json({error: "No token is provided"});
        }

        const decodedUser = jwt.verify(token,process.env.JWT_TOKEN);

        const existingUser = await User.findOne({_id:decodedUser._id});
        if(!existingUser){
            return res.status(404).json({message: "No such user found"});
        }

        req.user = decodedUser;
        next();
    } catch(error){
        console.log("something went wrong in protectRoutes");
        res.status(400).send({message: "Internal Server error"});
    }
}