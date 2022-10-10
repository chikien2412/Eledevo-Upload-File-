const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  img: { type: Array },

  time: { type: String },
});

module.exports = mongoose.model("item", newSchema);
