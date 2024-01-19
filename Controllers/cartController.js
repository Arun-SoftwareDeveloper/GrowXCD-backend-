// controllers/cartController.js
const CartItem = require("../Models/Cart");
const Product = require("../Models/Products");

const cartController = {
  getCart: async (req, res) => {
    try {
      const { cart } = req.session;
      res.json(cart || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  addToCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;

      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ error: "Invalid request" });
      }

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const cartItem = await CartItem.create({
        product: product._id,
        quantity,
      });

      // Apply discounts
      const discountedCartItem = applyDiscounts(cartItem, product);

      req.session.cart = req.session.cart || [];
      req.session.cart.push(discountedCartItem);

      res.status(201).json(discountedCartItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { productId } = req.params;

      if (!productId) {
        return res.status(400).json({ error: "Invalid request" });
      }

      const { cart } = req.session;

      if (!cart || cart.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      const indexToRemove = cart.findIndex((item) => item.product == productId);

      if (indexToRemove === -1) {
        return res.status(404).json({ error: "Product not found in cart" });
      }

      cart.splice(indexToRemove, 1);
      req.session.cart = cart;

      res.json({ message: "Item removed from cart" });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Function to apply discounts based on product's discount_type and discount_value
  applyDiscounts: (cartItem, product) => {
    let discountedCartItem = { ...cartItem };

    if (product.discount_type === "flat") {
      discountedCartItem.totalPrice -= product.discount_value;
    } else if (product.discount_type === "percentage") {
      const discountAmount = (product.discount_value / 100) * product.price;
      discountedCartItem.totalPrice -= discountAmount;
    } else if (product.discount_type === "bogo") {
      // Buy One Get One (BOGO) Discount
      discountedCartItem.quantity =
        Math.floor(discountedCartItem.quantity / 2) +
        (discountedCartItem.quantity % 2);
      discountedCartItem.totalPrice =
        discountedCartItem.quantity * product.price;
    }

    return discountedCartItem;
  },

  // ... (other functions)
};

module.exports = cartController;
