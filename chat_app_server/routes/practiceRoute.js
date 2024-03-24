const express = require("express");
const { createPractice } = require("../controllers/practiceController");
// const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/createPractice", createPractice);

module.exports = router;
