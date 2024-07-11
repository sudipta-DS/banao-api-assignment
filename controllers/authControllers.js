const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  let { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists." });
    } else {
      try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
          username: username,
          email: email,
          password: hashPassword,
        });
        res.status(201).json({ newUser });
      } catch (error) {
        res.status(500).json({ message: "something problem happened" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existingUser = await userModel.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (!existingUser) {
      res.status(400).json({ message: "user not found." });
    } else {
      const isCorrectPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (isCorrectPassword) {
        jwt.sign({ email: email }, "banao-assignment", (error, token) => {
          if (!error) {
            res.status(201).send({ message: "login successful", token: token });
          } else {
            console.log(error);
          }
        });
      } else {
        res.status(400).json({ message: "Incorrect Password." });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "something problem happened" });
  }
};

const forgotPasswordController = async (req, res) => {
  let { email, username, currentPassword, newPassword } = req.body;
  try {
    const existingUser = await userModel.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (!existingUser) {
      res.status(400).send({ message: "user not found." });
    } else {
      const isCorrectPassword = await bcrypt.compare(
        currentPassword,
        existingUser.password
      );
      if (isCorrectPassword) {
        const hashPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await userModel.findOneAndUpdate(
          {
            $or: [{ email: email }, { username: username }],
          },
          { password: hashPassword }
        );
        res
          .status(200)
          .send({ message: "password updated successfully.", updatedUser });
      } else {
        res.status(400).send({ message: "Incorrect Password" });
      }
    }
  } catch (error) {
    res.status(500).status({ message: "something problem happened" });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
};
