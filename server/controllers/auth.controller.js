import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import AsyncHandler from "express-async-handler";
import { generateToken, generateCookie } from "../utils/headers.js";
import sendResponse from "../handlers/response.handler.js";

const Register = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  const token = generateToken({ id: user._id, isAdmin: user.isAdmin });
  generateCookie(res, token);

  await user.save();
  sendResponse(res, {
    statusCode: 201,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

const Login = AsyncHandler(async (req, res) => {
  if (req.cookies.__valorem_session) {
    res.status(400);
    sendResponse(res, {
      statusCode: 400,
      message: "Already signed in",
    });
    return;
  }
  const { email, password } = req.body;

  // Validate user credentials
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    sendResponse(res, {
      statusCode: 401,
      message: "Invalid email or password",
    });
    return;
  }
  const token = generateToken({ id: user._id, isAdmin: user.isAdmin });

  generateCookie(res, token);

  sendResponse(res, {
    statusCode: 200,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

const LogOut = AsyncHandler(async (req, res) => {
  res.clearCookie("__valorem_session", {
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getMe = AsyncHandler(async (req, res) => {
  // req.user is set by the authenticate middleware
  const user = await User.findById(req.user._id)
    .select("-password -__v")
    .populate("courses", "name price _id")
    .lean();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    success: true,
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        courses: user.courses,
        createdAt: user.createdAt
      }
    }
  });
});

export { Register, Login, LogOut, getMe };
