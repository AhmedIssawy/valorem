import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AsyncHandler from "express-async-handler";

const Register = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Check if user already exists
  const existingUser = await User.find({ email });
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
  await user.save();
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

const Login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials
  const user = await User.find({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

export { Register, Login };
