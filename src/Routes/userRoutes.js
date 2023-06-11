//importing modules
const express = require("express");

const retailerController = require("../Controllers/retailerController");
const { signup, login } = retailerController;

const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.post("/signup", signup);

//login route
router.post("/login", login);

module.exports = router;