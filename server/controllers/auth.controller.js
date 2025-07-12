import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import AsyncHandler from "express-async-handler";
import { generateToken, generateCookie } from "../utils/index.js";

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
  res.status(201).json({
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

const Login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }
  const token = generateToken({ id: user._id, isAdmin: user.isAdmin });

  generateCookie(res, token);

  res.status(200).json({
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export { Register, Login };
