import jwt from "jsonwebtoken";
import "dotenv/config.js";

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });

const generateCookie = (res, token) => {
  res.cookie("__valorem_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  return;
};

export { generateToken, generateCookie };
