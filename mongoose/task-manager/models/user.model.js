import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const userModel = model("User",userSchema);
export default userModel;