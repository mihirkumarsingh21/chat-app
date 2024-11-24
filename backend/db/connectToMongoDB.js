import  mongoose from "mongoose";



const connectToMongoDB = async () => {
    try {
     const dbName = "chat-app";
     const response = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}` );
     console.log(`MongoDB connected successfully HOST: ${response.connection.host}`);
    } catch (error) {
        console.log("ERROR:", error.message);
    }
}

export default connectToMongoDB;