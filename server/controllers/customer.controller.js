import Product from "../models/course.model.js";
import AsyncHandler from "express-async-handler";

const getCourseById = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id).select("-__v").lean();
  res.status(200).json({
    data: product,
  });
});

const getPageOfCourses = AsyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const courses = await Product.find()
    .skip(skip)
    .limit(Number(limit))
    .select("name price image category")
    .sort({ _id: -1 })
    .lean();

  res.status(200).json({
    data: courses,
  });
});

const getCourseVideo = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const course = await Product.findById(id).select("video").lean();
  if (!course || !course.video) {
    return res.status(404).json({ message: "Video not found" });
  }

  res.status(200).json({
    data: course.video,
  });
});

// const payForOrderUsingPayPal = AsyncHandler(async (req, res) => {});

export {
  getCourseById,
  getPageOfCourses,
  getCourseVideo,
  // payForOrderUsingPayPal,
};
