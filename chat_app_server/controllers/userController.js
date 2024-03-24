const expressAsyncHandler = require("express-async-handler");
const User = require("../modals/userModel");
const { generateToken } = require("../config/jwtToken");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      message: "All necessary input fields have not been field",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const data = await User.create(req.body);
      res.status(201).json({
        success: true,
        message: data,
        token: generateToken(data._id),
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;
  if (!name) {
    res.status(400).json({
      success: false,
      message: "Please provide an user name",
    });
  } else if (!password) {
    res.status(400).json({
      success: false,
      message: "Please provide password",
    });
  }
  try {
    const user = await User.findOne({ name });
    if (!user) {
      res.status(400).json("User does not exist");
    }
    const isPasswordMatched = await user.isPasswordMatched(password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    } else {
      res.status(200).json({
        sucess: true,
        data: user,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

const getUser = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.find({ name: "Shubh One" });
    if (!user) {
      res.status(400).json({
        message: "User does not found",
      });
    } else {
      res.status(200).json({
        message: user,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
});

const fetchUsers = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  console.log("keyword", keyword);

  const users = await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.status(200).json({
    data: users,
  });
});

module.exports = { registerUser, loginUser, getUser, fetchUsers };
