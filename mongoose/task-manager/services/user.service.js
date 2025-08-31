import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({username, password: hashedPassword});
    return await newUser.save();
}

export const loginUser = async (username, password) => {
    const user = await User.findOne({username});
    if(!user || !(await bcrypt.compare(password, user.password))){
        throw new Error("Invalid username or password");
    }

    return user;
}
