//importing modules
const express = require("express");

const auth = require("../middlewares/auth");
const retailerController = require("../controllers/retailerController");

const { signup, login, findAllRetailer } = retailerController;

const router = express.Router();
// Get All retailer
router.route("/").get(findAllRetailer);
// signup endpoint
router.post("/signup", signup);
// login route
router.post("/login", login);

module.exports = router;
