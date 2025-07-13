import Coupon from "../models/coupon.model.js";
import User from "../models/user.model.js";
import AsyncHandler from "express-async-handler";

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

  const coupon = await Coupon.findOne({ code });
  if (!coupon) {
    return res.status(404).json({ message: "Coupon not found" });
  }

  if (coupon.used === true) {
    return res
      .status(400)
      .json({ message: "This coupon has already been used" });
  }

  const user = await User.findById(req.user._id);
  const alreadyHasCourse = user.courses.some(
    (courseId) => courseId.toString() === coupon.course.toString()
  );

  if (alreadyHasCourse) {
    return res.status(400).json({ message: "You already own this course" });
  }

  coupon.user = req.user._id;
  coupon.used = true;
  await coupon.save();

  user.courses.push(coupon.course);
  await user.save();

  res.status(200).json({ message: "Coupon redeemed successfully" });
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

  res.status(200).json({
    data: {
      coupons,
    },
  });
});

export { createCoupon, deleteCoupon, redeemCoupon, getPageOfCoupons };
