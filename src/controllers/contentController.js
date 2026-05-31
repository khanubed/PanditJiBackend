import Content from "../models/contentSchema.js";

export const saveSection = async (req, res) => {
  try {
    const { sectionName } = req.params;
    const data = req.body;

    // findOneAndUpdate with upsert: true
    const updatedContent = await Content.findOneAndUpdate(
      { section: sectionName },
      { values: data, lastUpdated: Date.now() },
      { upsert: true, returnDocument : "after" },
    );

    res.status(200).json({ success: true, data: updatedContent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSection = async (req, res) => {
  try {
    const content = await Content.findOne({ section: req.params.sectionName });
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


