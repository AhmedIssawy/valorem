import Order from "../models/order.model.js";
import AsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Product from "../models/course.model.js";

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
    .populate("user", "name email")
    .populate("product", "name price")
    .lean();
  res.status(200).json({
    data: order,
  });
});

const createOrder = AsyncHandler(async (req, res) => {
  const { paymentMethod } = req.body;
  const { id } = req.params;
  const user = req.user._id;
  const productDetails = await Product.findById(id).lean();

  const order = new Order({
    user,
    product: productDetails,
    price: productDetails.price,
    paymentMethod,
  });

  if (!order) return res.status(400).json({ message: "Order creation failed" });

  await order.save();

  res.status(201).json({
    data: order,
  });
});

export { getPageOfOrders, getOrderById, createOrder };
