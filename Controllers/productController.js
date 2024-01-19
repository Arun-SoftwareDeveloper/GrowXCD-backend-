// controllers/productController.js
const Product = require("../Models/Products");

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const {
        category,
        brand,
        price,
        quantity,
        discount_type,
        discount_value,
        images,
      } = req.body;

      const newProduct = await Product.create({
        category,
        brand,
        price,
        quantity,
        discount_type,
        discount_value,
        images,
      });

      res
        .status(201)
        .json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find({});

      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ProductController;
