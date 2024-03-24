const mongoose = require("mongoose");

var prodSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Prod", prodSchema);
