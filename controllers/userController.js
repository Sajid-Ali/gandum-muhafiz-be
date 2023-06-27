//importing modules
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

// Assigning users to the variable User
const User = db.user;

const findAllUser = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      status: "success",
      results: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const payload = req.body;

    const user = await User.create(payload);

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        status: "failed",
        message: "User already exists",
      });
    }

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await User.update(
      { ...req.body, updatedAt: Date.now() },
      {
        where: {
          id: req.params.userId,
        },
      }
    );

    if (result[0] === 0) {
      return res.status(404).json({
        status: "failed",
        message: `User not found with ID: ${req.params.userId}`,
      });
    }

    const user = await User.findByPk(req.params.userId);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const findUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: `User not found with ID: ${req.params.userId}`,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await User.destroy({
      where: { id: req.params.userId },
      force: true,
    });

    if (result === 0) {
      return res.status(404).json({
        status: "failed",
        message: `User not found with ID: ${req.params.userId}`,
      });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  findUser,
  createUser,
  updateUser,
  findAllUser,
  deleteUser,
};
