import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { registerUser, loginUser } from "../controllers/userController.js"

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/register", async (req, res) => {

  const { firstName, lastName, email, contact, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    contact,
    password: hashedPassword
  });

  await user.save();

  res.json({ message: "User Registered" });

});

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  res.json({ message: "Login successful", user });

});

export default router;