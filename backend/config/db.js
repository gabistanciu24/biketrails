import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/bike_trails";

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
