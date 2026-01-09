// models are used to define the db schema 
import mongoose from "mongoose";
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB connected")
    }
    catch(error){
        console.error("mongo connection failed", error.message);
        process.exit(1);
    }
}
export default connectDB;