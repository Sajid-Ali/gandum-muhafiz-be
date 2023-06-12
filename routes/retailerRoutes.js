//importing modules
const express = require("express");

const auth = require("../middlewares/auth");
const retailerController = require("../controllers/retailerController");

const { signup, login } = retailerController;

const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.post("/signup", auth.saveRetailer, signup);

//login route
router.post("/login", login);

module.exports = router;
