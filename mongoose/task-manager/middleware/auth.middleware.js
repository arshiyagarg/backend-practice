import User from '../models/user.model.js';

export const validateUser = async (req, res, next) => {
    const userId = req.get("userId");

    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found, create an account"
            })
        }

        next();
    } catch(err){
        console.log(err);
        return res.send({
            success: false,
            message: err.message
        })
    }
}