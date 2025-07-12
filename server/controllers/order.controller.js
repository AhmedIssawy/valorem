import Order from "../models/order.model.js";
import AsyncHandler from "express-async-handler";
import User from "../models/user.model.js";

const getPageOfOrders = AsyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const orders = await Order.find()
    .skip(skip)
    .limit(Number(limit))
    .sort({ _id: -1 })
    .populate("user", "name email")
    .populate("product", "name price")
    .select("-__v")
    .lean();

  res.status(200).json({
    data: orders,
  });
});

const getOrderById = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id)
    .populate("user", "name emai  l")
    .populate("product", "name price")
    .lean();
  res.status(200).json({
    data: order,
  });
});

const createOrder = AsyncHandler(async (req, res) => {
  const { product, shippingAddress, paymentMethod } = req.body;
  const user = req.user._id;

  const order = new Order({
    user,
    product,
    price: product.price,
    shippingAddress,
    paymentMethod,
  });

  await User.findByIdAndUpdate(user, { $push: { courses: product._id } });

  await order.save();

  res.status(201).json({
    data: order,
  });
});

export { getPageOfOrders, getOrderById, createOrder };
