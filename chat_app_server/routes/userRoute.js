const express = require("express");
const {
  registerUser,
  loginUser,
  logOut,
  getUsers,
  fetchUsers,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/logout", logOut);
router.get("/getAllUsers", authMiddleware, getUsers);
router.get("/fetchUsers", authMiddleware, fetchUsers);

module.exports = router;
