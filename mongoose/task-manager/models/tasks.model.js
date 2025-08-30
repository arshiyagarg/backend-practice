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
    status: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: User
    }
})

const taskModel = model("Task",taskSchema);
export default taskModel;