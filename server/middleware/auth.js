import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid token" });
  }
};

export default auth;
