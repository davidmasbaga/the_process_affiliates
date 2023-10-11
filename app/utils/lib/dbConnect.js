import mongoose from "mongoose";

mongoose.set("strictQuery", false)


const connectDB = async () =>{
  const mongoUri=process.env.MONGODB_URI  

  return await mongoose.connect(mongoUri)
  
}

export default connectDB
