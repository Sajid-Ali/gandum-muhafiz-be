//importing modules
const express = require("express");
const userController = require("../Controllers/userController");
const { signup, login } = userController;
const auth = require("../Middlewares/auth");

const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.post("/signup", auth.saveRetailer, signup);

//login route
router.post("/login", login);

module.exports = router;
