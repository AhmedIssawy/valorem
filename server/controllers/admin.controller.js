import Product from "../models/course.model.js";
import User from "../models/user.model.js";
import AsyncHandler from "express-async-handler";

const getPageOfUsers = AsyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .skip(skip)
    .limit(Number(limit))
    .select("-password")
    .sort({ _id: -1 })
    .lean();

  res.status(200).json({
    data: users,
  });
});

const getUserById = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password").lean();
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({
    data: user,
  });
});

const updateCourse = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, category, image, description } = req.body;

  const course = await Product.findByIdAndUpdate(
    id,
    {
      name,
      price,
      category,
      image,
      description,
    },
    { new: true, runValidators: true }
  );
  if (!course) {
    res.status(404).json({ message: "Course not found" });
    return;
  }
  res.status(200).json({
    data: course,
  });
});

const createCourse = AsyncHandler(async (req, res) => {
  const { name, price, category, image, description } = req.body;

  const course = new Product({
    name,
    price,
    category,
    image,
    description,
  });

  await course.save();

  res.status(201).json({
    data: course,
  });
});

const deleteCourse = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const course = await Product.findByIdAndDelete(id);
  if (!course) {
    res.status(404).json({ message: "Course not found" });
    return;
  }

  res.status(200).json({
    message: "Course deleted successfully",
  });
});

export { getPageOfUsers, getUserById, updateCourse, createCourse, deleteCourse };
