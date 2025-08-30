import mongoose from "mongoose";

const connectUserDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/users")
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch(err){
        console.log(`Error connetcing to users DB: ${err.message}`);
        process.exit(1);
    }
}

export default connectUserDB;