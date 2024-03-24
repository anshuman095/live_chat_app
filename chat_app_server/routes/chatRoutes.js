const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  accessChats,
  fetchChats,
  createGroupChats,
  fetchGroups,
  exitGroup,
  addSelfToGroup,
} = require("../controllers/chatController");

router.post("/accessChats", authMiddleware, accessChats);
router.get("/fetchChats", authMiddleware, fetchChats);
router.get("/fetchGroups", authMiddleware, fetchGroups);
router.post("/createGroup", authMiddleware, createGroupChats);
router.put("/exitGroup", authMiddleware, exitGroup);
router.put("/addSelfToGroup", authMiddleware, addSelfToGroup);

module.exports = router;
