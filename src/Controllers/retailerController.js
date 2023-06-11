//importing modules
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

// Assigning retailers to the variable Retailer
const Retailer = db.retailers;

//signing a retailer up
//hashing retailers password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { retailerName, email, password } = req.body;
    const data = {
      retailerName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    //saving the retailer
    const retailer = await Retailer.create(data);

    //if retailer details is captured
    //generate token with the retailer's id and the secretKey in the env file
    // set cookie with the token generated
    if (retailer) {
      let token = jwt.sign({ id: retailer.id }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("retailer", JSON.stringify(retailer, null, 2));
      console.log(token);
      //send retailers details
      return res.status(201).send(retailer);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

//login authentication

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a retailer by their email
    const retailer = await Retailer.findOne({
      where: {
        email: email,
      },
    });

    //if retailer email is found, compare password with bcrypt
    if (retailer) {
      const isSame = await bcrypt.compare(password, retailer.password);

      //if password is the same
      //generate token with the retailer's id and the secretKey in the env file

      if (isSame) {
        let token = jwt.sign({ id: retailer.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the retailer
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("retailer", JSON.stringify(retailer, null, 2));
        console.log(token);
        //send retailer data
        return res.status(201).send(retailer);
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
};
