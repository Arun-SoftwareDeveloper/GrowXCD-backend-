// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./Routes/authRoutes");
const productRoutes = require("./Routes/productRoutes");
const db = require("./config/db");
const cartRoutes = require("./Routes/cartRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
db.connect();

// Routes
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

// Start the server
const Port = 4000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
