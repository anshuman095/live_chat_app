const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  const paylaod = id;
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = { generateToken };
