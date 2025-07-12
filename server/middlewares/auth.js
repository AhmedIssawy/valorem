import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AsyncHandler from "express-async-handler";

const authenticate = AsyncHandler(async (req, res, next) => {
  console.log(req.cookies);

  const token =
    req.cookies.__valorem_session || req.headers.authorization?.split(" ")[1];
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
    if (!req.user || !roles.includes(req.user.isAdmin ? "admin" : "user")) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
};

export { authenticate, authorization };
