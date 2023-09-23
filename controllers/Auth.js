const jwt = require("jsonwebtoken");
const resController = require("./ResController");
require("dotenv").config();

const Auth = async (req, res, next) => {
  try {
    const token = req.headers.cookie.slice(6);
    jwt.verify(token, process.env.JWT_SECRET);

    req.token = token;
  } catch (error) {
    next(
      resController(
        res,
        "fail",
        401,
        `Authentication error, please login again!`
      )
    );
  }
  next();
};

module.exports = Auth;
