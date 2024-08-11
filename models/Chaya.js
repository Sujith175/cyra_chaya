const mongoose = require("mongoose");

const ChayaSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Chaya", ChayaSchema);
