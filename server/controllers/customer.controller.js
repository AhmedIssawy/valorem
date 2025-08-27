import Product from "../models/course.model.js";
import User from "../models/user.model.js";
import AsyncHandler from "express-async-handler";
import R2Service from "../services/r2.service.js";

const getCourseById = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id).select("-__v").lean();
  if (!product) {
    return res.status(404).json({ message: "Course not found" });
  }

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
  const userId = req.user._id;

  console.log("➡️ getCourseVideo called with:", { courseId: id, userId });

  // Verify course exists
  const course = await Product.findById(id).lean();
  console.log("📦 Course from DB:", course);

  if (!course) {
    console.log("❌ Course not found in DB:", id);
    return res.status(404).json({ message: "Course not found" });
  }

  // Check if user owns this course
  const user = await User.findById(userId);
  console.log("👤 User from DB:", user?.email || user?._id);

  const ownsCourse = user.courses.some(
    (courseId) => courseId.toString() === id
  );
  console.log("🔑 User owns course:", ownsCourse);

  if (!ownsCourse) {
    console.log("❌ User does not own this course:", { userId, courseId: id });
    return res.status(403).json({
      message:
        "You don't have access to this course. Please purchase it first.",
      courseId: id,
      courseName: course.name,
    });
  }

  try {
    // Check if course has a video URL
    console.log("🎥 Course video field:", course.video);

    if (!course.video) {
      console.log("❌ No video field in course:", course._id);
      return res.status(404).json({
        message: "No video available for this course",
        courseId: id,
      });
    }

    // Check if video exists in R2
    console.log("🔍 Checking if video exists in R2:", course.video);
    const videoExists = await R2Service.videoExists(course.video);
    console.log("✅ videoExists result:", videoExists);

    if (!videoExists) {
      console.log("❌ Video not found in R2 storage:", course.video);
      return res.status(404).json({
        message: "Video file not found in storage",
        courseId: id,
      });
    }

    // Generate signed URL (expires in 5 minutes)
    console.log("🔑 Generating signed URL for video...");
    const signedUrl = await R2Service.generateSignedVideoUrl(course.video, 300);
    console.log("✅ Signed URL generated:", signedUrl);

    res.status(200).json({
      success: true,
      data: {
        videoUrl: signedUrl,
        expiresIn: 300, // 5 minutes
        courseId: id,
        courseName: course.name,
        message: "Video access granted. URL expires in 5 minutes.",
      },
    });
  } catch (error) {
    console.error("🔥 Error accessing course video:", error);
    res.status(500).json({
      message: "Failed to access course video",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
});


// const payForOrderUsingPayPal = AsyncHandler(async (req, res) => {});

export {
  getCourseById,
  getPageOfCourses,
  getCourseVideo,
  // payForOrderUsingPayPal,
};
