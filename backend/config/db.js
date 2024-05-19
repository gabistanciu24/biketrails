import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.url;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database is connected...");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
