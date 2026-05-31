import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
  // Header se token nikalna (format: "Bearer token_value")
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }

//   console.log("Token received in middleware:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};