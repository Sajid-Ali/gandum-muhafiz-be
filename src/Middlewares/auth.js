//importing modules
const db = require("../Models");
//Assigning db.users to User variable
const User = db.users;

//Function to check if CNIC or email already exist in the database
//this is to avoid having two users with the same CNIC and email
const saveRetailer = async (req, res, next) => {
  //search the database to see if user exist
  try {
    const existingUser = await User.findOne({
      where: {
        cnic: req.body.cnic,
      },
    });
    //if CNIC exist in the database respond with a status of 409
    if (existingUser) {
      return res.json(409).send("User already already exist");
    }

    // //checking if email already exist
    // const emailcheck = await User.findOne({
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
