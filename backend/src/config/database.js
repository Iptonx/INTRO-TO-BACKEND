import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect
    (`${process.env.MONGODB_URI}`);
    console.log(`MongoDB conectado: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`MongoDB coneccion fallida: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
