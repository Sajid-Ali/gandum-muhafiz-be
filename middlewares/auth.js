//importing modules
const db = require("../models");
//Assigning db.retailer to Retailer variable
const Retailer = db.retailer;

//Function to check if CNIC or email already exist in the database
//this is to avoid having two users with the same CNIC and email
const saveRetailer = async (req, res, next) => {
  //search the database to see if user exist
  try {
    const existingUser = await Retailer.findOne({
      where: {
        username: req.body.username,
      },
    });
    //if CNIC exist in the database respond with a status of 409
    if (existingUser) {
      return res.json(409).send("Retailer already already exist");
    }

    // //checking if email already exist
    // const emailcheck = await Retailer.findOne({
    //   where: {
    //     email: req.body.email,
    //   },
    // });

    // //if email exist in the database respond with a status of 409
    // if (emailcheck) {
    //   return res.json(409).send("Authentication failed");
    // }

    next();
  } catch (error) {
    console.log(error);
  }
};

//exporting module
module.exports = {
  saveRetailer,
};
