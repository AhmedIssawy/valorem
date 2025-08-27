import Coupon from "../models/coupon.model.js";
import User from "../models/user.model.js";
import AsyncHandler from "express-async-handler";
import sendResponse from "../handlers/response.handler.js";

const createCoupon = AsyncHandler(async (req, res) => {
  const { course } = req.body;
  const coupon = new Coupon({
    course,
  });
  await coupon.save();
  res.status(201).json({ data: { coupon } });
});

const deleteCoupon = AsyncHandler(async (req, res) => {
  const { code } = req.body;
  await C.deleteOne({ code }).lean;
  res.status(204);
});

const redeemCoupon = AsyncHandler(async (req, res) => {
  const { code } = req.body;
  // console.log(req.user);

  const coupon = await Coupon.findOne({ code });
  if (!coupon) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Coupon not found",
      error: "COUPON_NOT_FOUND",
    });
  }
  console.log("1");

  if (coupon.used === true) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "This coupon has already been used",
      error: "COUPON_ALREADY_USED",
    });
  }
  console.log("2");

  console.log(coupon);

  const user = await User.findById(req.user._id);
  const alreadyHasCourse = user.courses.some(
    (courseId) => courseId.toString() === coupon.course.toString()
  );

  if (alreadyHasCourse) {
    return sendResponse(res, 400, { message: "You already own this course" });
  }

  coupon.user = req.user._id;

  user.courses.push(coupon.course);

  coupon.used = true;

  await coupon.save();
  await user.save();
  console.log(user);

  sendResponse(res, { message: "Coupon redeemed successfully" });
});

const getPageOfCoupons = AsyncHandler(async (req, res) => {
  const { used = "false", page = 1, limit = 10 } = req.query;

  const query = {};
  if (used !== "all") {
    query.used = used === "true";
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const coupons = await Coupon.find(query)
    .select("-__v")
    .sort({ _id: -1 })
    .populate("course", "name price _id")
    .populate("user", "name email _id")
    .skip(skip)
    .limit(parseInt(limit))
    .lean();

  sendResponse(res, {
    data: {
      coupons,
      page: parseInt(page),
      limit: parseInt(limit),
      total: await Coupon.countDocuments(query),
    },
  });
});

export { createCoupon, deleteCoupon, redeemCoupon, getPageOfCoupons };
