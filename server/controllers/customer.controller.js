import Product from "../models/product.model";
import AsyncHandler from "express-async-handler";

const getpageOfProducts = AsyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const products = await Product.find()
    .skip(skip)
    .limit(Number(limit))
    .sort({ _id: -1 })
    .lean();

  res.status(200).json({
    data: products,
  });
});

const getProductById = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id).lean();
  res.status(200).json({
    data: product,
  });
});


