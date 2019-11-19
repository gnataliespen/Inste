const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");
module.exports = async token => {
  //Check for token
  if (!token) {
    return false;
  }
  //Verify token
  try {
    const decoded = await jwt.verify(token, jwtSecret);
    return decoded.userId;
  } catch (err) {
    return false;
  }
};
