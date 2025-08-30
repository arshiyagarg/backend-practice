import mongoose from "mongoose";

const connectTaksDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/tasks")
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch(err) {
        console.log(`Error connetcing to tasks DB: ${err.message}`);
        process.exit(1);
    }
}

export default connectTaksDB;   