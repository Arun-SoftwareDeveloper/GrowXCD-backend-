// routes/productRoutes.js
const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware");
const ProductController = require("../Controllers/productController");

const productRoutes = express.Router();

productRoutes.post("/create", authMiddleware, ProductController.createProduct);
productRoutes.get("/getAll", authMiddleware, ProductController.getAllProducts);

module.exports = productRoutes;
