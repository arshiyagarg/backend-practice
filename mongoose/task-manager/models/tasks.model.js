import { Schema, model } from "mongoose";
import User from "./user.model.js";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    }
}, {timestamps: true})

const taskModel = model("Task",taskSchema);
export default taskModel;