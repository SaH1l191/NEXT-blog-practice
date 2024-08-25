
import mongoose from "mongoose";



const connectToDB = async()=>{
    const connectionString = "mongodb+srv://asphaltking30:RE465OUaJrsszacV@cluster0c.zji05.mongodb.net/" 
    mongoose.connect(connectionString)
    .then(()=>{console.log("Connected to MongoDB")})
    .catch((e)=>{console.error("Failed to connect to MongoDB => ",e)})

}
export default connectToDB