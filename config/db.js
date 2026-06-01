import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      "Connected to Vedic Database:",
      conn.connection.host
    );

    return conn;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};