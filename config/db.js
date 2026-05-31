import mongoose from "mongoose";

export const connectDB = async (params) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to Vedic Database"))
    .catch((err) => console.log(err));
};
