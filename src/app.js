import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

config();

import { saveSection, getSection } from "./controllers/contentController.js";
import { connectDB } from "../config/db.js";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import { uploadImage } from "./controllers/uploadController.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import { isAdmin } from "./middleware/authMiddleware.js";
import queryRouter from "./routes/queryRouter.js";

const app = express();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.PRODUCTION_FRONTEND_URL,
];

await connectDB();

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
// Database Connection


const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

// Routes
// Public route for main website to fetch data
app.get("/api/content/:sectionName", getSection);

app.use("/api/auth", authRouter);
app.use("/api/query", queryRouter);

// Protected route for Admin Panel (You'll add auth middleware here later)
app.put("/api/content/:sectionName", isAdmin, saveSection);

// THE IMAGE UPLOAD ROUTE
// 'image' is the field name we will use in FormData on the frontend
app.post("/api/upload", isAdmin, upload.single("image"), uploadImage);

export default app;
