import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    address: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Query", QuerySchema);