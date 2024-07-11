const express = require("express");

const {
  registerController,
  loginController,
  forgotPasswordController,
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);

module.exports = router;
