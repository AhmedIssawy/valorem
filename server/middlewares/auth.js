import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AsyncHandler from "express-async-handler";

const authenticate = AsyncHandler(async (req, res, next) => {
  const token =
    req.cookies.__valorem_token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
});

const authorization = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
};

export { authenticate, authorization };
