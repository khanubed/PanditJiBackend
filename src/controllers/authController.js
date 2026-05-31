import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { username, password } = req.body;

  // console.log("sever hit");

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Generate Token
    const token = jwt.sign({ username : username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      token: token, // Frontend ise localStorage mein save karega
      message: "Login successful!",
    });
  }

  res.status(401).json({ success: false, message: "Invalid Credentials" });
};

export const logout = async (req, res) => {
  res.clearCookie("admin_token");
  res.json({ success: true, message: "Logged out successfully" });
};
