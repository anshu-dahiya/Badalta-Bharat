import mongoose from "mongoose";

let connectdb = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(' your mongodb connected successfully');
        
    } catch (error) {
        console.error('failed to connect to mongodb');
        throw new Error("MongoDB Connection Failed");
    }
}

export default connectdb;