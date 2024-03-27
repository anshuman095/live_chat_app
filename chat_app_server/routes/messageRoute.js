const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { sendMessage, getMessage } = require("../controllers/messageController");

router.post("/send/:receiverId", authMiddleware, sendMessage);
router.get("/get/:userToChatId", authMiddleware, getMessage);

module.exports = router;
