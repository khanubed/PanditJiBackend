import express from "express";
import { 
  createQuery, 
  getAllQueries, 
  toggleQueryStatus, 
  deleteQuery 
} from "../controllers/queryController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const queryRouter = express.Router();

// Public route for frontend submission form
queryRouter.post("/", createQuery);

// Admin-facing routes (Add your admin auth middleware protect logic here if required)
queryRouter.get("/",isAdmin ,getAllQueries);
queryRouter.patch("/:id/status", isAdmin, toggleQueryStatus);
queryRouter.delete("/:id", isAdmin, deleteQuery);

export default queryRouter;