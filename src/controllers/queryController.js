import Query from "../models/querySchema.js";

// @desc    Submit a new user query from public website form
// @route   POST /api/queries
export const createQuery = async (req, res) => {
  try {
    const { name, mobile, address, message } = req.body;

    if (!name || !mobile || !message) {
      return res.status(400).json({ success: false, message: "Please fill all required fields." });
    }

    const newQuery = await Query.create({ name, mobile, address, message });
    res.status(201).json({ success: true, data: newQuery });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error, failed to submit query." });
  }
};

// @desc    Get all queries for Admin Panel
// @route   GET /api/queries
export const getAllQueries = async (req, res) => {
  try {
    // Sort by newest requests first
    const queries = await Query.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: queries.length, data: queries });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch queries." });
  }
};

// @desc    Toggle query resolution status
// @route   PATCH /api/queries/:id/status
export const toggleQueryStatus = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found." });
    }

    query.status = query.status === "pending" ? "resolved" : "pending";
    await query.save();

    res.status(200).json({ success: true, data: query });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update status." });
  }
};

// @desc    Delete a query record permanently
// @route   DELETE /api/queries/:id
export const deleteQuery = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found." });
    }

    await query.deleteOne();
    res.status(200).json({ success: true, message: "Query removed successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete record." });
  }
};