import { registerUser, loginUser } from "../services/user.service.js";

export const signup = async (req, res) => {
    const {username, password} = req.body;

    try{
        const newUser = await registerUser(username, password);
        res.status(201).send({
            success: true,
            data: newUser,
            message: "User created successfully"
        })
    } catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
}

export const login = async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = await loginUser(username, password);
        req.session.userId = user._id;
        console.log("Session after login: ", req.session);
        res.status(200).send({
            success: true,
            data: user,
            message: "User logged in successfully"
        })
    } catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
}

export const logout = async (req, res) => {
    try{
        req.session.destroy((err) => {
            if (err) {
                console.error("Session destruction error:", err);
                return res.status(500).json({ message: "Error logging out" });
            }
            res.clearCookie("connect.sid"); 
            return res.status(200).send({ success: true ,message: "Logout successful" });
        });
    } catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
}