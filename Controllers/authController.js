const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const jwtConfig = require("../config/jwt");

const AuthController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({ username, password: hashedPassword });

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration failed:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id, username: user.username },
        jwtConfig.secret,
        {
          expiresIn: jwtConfig.expiresIn,
        }
      );

      res.json({ token });
    } catch (error) {
      console.error("Login failed:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = AuthController;
