const mongoose = require("mongoose");

var practiceSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  qty: {
    type: Number,
  },
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prod",
    },
  ],
  tags: [],
});

module.exports = mongoose.model("Practice", practiceSchema);
