import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    }
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const userModel = model("User", userSchema);
export default userModel;