const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { username, password, confirmPassword, email } = req.body;

  try {
    if (!username || !password || !confirmPassword || !email) {
      return res.status(400).json({
        status: "ERR",
        message: "username, password, confirmPassword, and email are required"
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "ERR",
        message: "Password and confirmPassword do not match"
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email
    });
    res.status(201).json({
      status: "OK",
      message: "User created successfully",
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({
        status: "ERR",
        message: "username and password are required"
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.status(200).json({
      status: "OK",
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
};

module.exports = { register, login };
