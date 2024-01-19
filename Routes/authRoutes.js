// routes/authRoutes.js
const express = require("express");
const AuthController = require("../Controllers/authController");

const authRoutes = express.Router();

authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);

module.exports = authRoutes;
