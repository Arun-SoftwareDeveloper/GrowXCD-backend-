// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cartController");

// Route to get the cart
router.get("/getCart", cartController.getCart);

// Route to add a product to the cart
router.post("/addToCart", cartController.addToCart);

// Route to remove a product from the cart
router.delete("/removeFromCart/:productId", cartController.removeFromCart);

// ... (other routes)

module.exports = router;
