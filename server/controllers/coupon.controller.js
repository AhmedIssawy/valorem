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
  const coupon = await Coupon.findOne({ code }).lean;
  if (coupon.used) {
    let message = "this coupon is used already!";
    res.status(400).json({ message });
  }
  coupon.user = req.user;
  coupon.used = true;
  await User.findByIdAndUpdate(req.user._id, {
    $push: { courses: coupon.course },
  });

  res.status(200).json({ message: "done" });
});

export { createCoupon, deleteCoupon, redeemCoupon };
