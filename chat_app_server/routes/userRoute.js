const express = require("express");
const { registerUser, loginUser, getUser, fetchUsers } = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.get("/getUser", getUser)
router.get("/fetchUsers", authMiddleware, fetchUsers)

module.exports = router;
