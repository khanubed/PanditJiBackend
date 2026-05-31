export const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // req.file.path is the URL provided by Cloudinary
    res.status(200).json({
      success: true,
      imageUrl: req.file.path, 
      public_id: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};