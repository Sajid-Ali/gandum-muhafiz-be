//importing modules
const express = require("express");

const userController = require("../controllers/userController");
const { findUser, createUser, updateUser, findAllUser, deleteUser } =
  userController;

const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.route("/").get(findAllUser).post(createUser);
router.route("/:userId").get(findUser).patch(updateUser).delete(deleteUser);

module.exports = router;
