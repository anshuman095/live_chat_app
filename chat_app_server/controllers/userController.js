const expressAsyncHandler = require("express-async-handler");
const User = require("../modals/userModel");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../utils/generateRefreshToken");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, fullName, email, password, gender } = req.body;
  if (!username || !fullName || !email || !password) {
    res.status(400).json({
      message: "All necessary input fields have not been field",
    });
  }
  try {
    const user_email = await User.findOne({ email });
    const user_username = await User.findOne({ username });
    if (user_email) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else if (user_username) {
      res.status(400).json({
        success: false,
        message: `${user_username.username} already taken`,
      });
    } else {
      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
      const data = await User.create({
        ...req.body,
        profile_pic: gender === "male" ? boyProfilePic : girlProfilePic,
      });
      const refreshToken = generateRefreshToken(data._id);
      await User.findByIdAndUpdate(
        data._id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.status(201).json({
        success: true,
        message: data,
        token: generateToken(data._id),
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
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
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json("User does not exist");
    }
    const isPasswordMatched = await user.isPasswordMatched(password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    } else {
      const refreshToken = generateRefreshToken(user._id);
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.status(200).json({
        sucess: true,
        data: updatedUser,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

const logOut = expressAsyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No refresh token in cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  console.log("user----->>", user);
  if (!user) {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.status(204);
  }
  await User.findOneAndUpdate(
    { refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  res.status(204);
});

const getUsers = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const all_users = await User.find({
      _id: { $ne: id },
    }).select("-password");
    if (!all_users) {
      res.status(400).json({
        message: "User does not found",
      });
    } else {
      res.status(200).json(all_users);
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

const blockUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Something went wrong");
    }
    const userToBlock = await User.findById(id);
    if (!userToBlock) {
      throw new Error("User does not exist");
    }
    const isUserBlockedAlready = user.blockedUsers.includes(id);

    const isUserBlockedBy = userToBlock.blockedBy.includes(_id);

    if (isUserBlockedAlready) {
      user.blockedUsers = user.blockedUsers.filter(
        (blockedUserId) => blockedUserId.toString() !== id
      );
    }

    if (isUserBlockedBy) {
      userToBlock.blockedBy = userToBlock.blockedBy.filter((blockedById) => {
        blockedById.toString() !== _id;
      });
    }

    user.blockedUsers.push(id);
    userToBlock.blockedBy.push(_id);

    await user.save();
    await userToBlock.save();
    res.status(200).json({
      message: "User Blcoked Successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

const unBlockUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const id = req.params.id;
  try {
    const userExist = await User.findById(_id);
    if (!userExist) {
      throw new Error("Something went wrong");
    }
    const userToUnBlock = await User.findById(id);
    if (!userToUnBlock) {
      throw new Error("User does not exist");
    }
    await User.findByIdAndUpdate(
      _id,
      { $pull: { blockedUsers: id } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      id,
      { $pull: { blockedBy: _id } },
      { new: true }
    );
    res.status(200).json({
      message: "User Unblocked Successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
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

  const users = await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.status(200).json({
    data: users,
  });
});

module.exports = {
  registerUser,
  loginUser,
  logOut,
  getUsers,
  blockUser,
  unBlockUser,
  fetchUsers,
};
