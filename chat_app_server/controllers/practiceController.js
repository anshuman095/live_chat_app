const Practice = require("../modals/practiceModel");
const Item = require("../modals/practiceItemModel");
const Prod = require("../modals/practiceProdModel");

const createPractice = async (req, res) => {
  try {
    const item = await Item.create(req.body.item);
    const prod = await Prod.create(req.body.results[0]);
    const practice = await Practice.create({
      item: item._id,
      qty: req.body.qty,
      results: [prod._id],
      tags: req.body.tags,
    });
    res.status(200).json({
      message: practice,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getPractice = async (req, res) => {
  // const
};

module.exports = { createPractice, getPractice };
