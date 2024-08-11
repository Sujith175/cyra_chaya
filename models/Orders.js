const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const OrdersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ordered_by: {
      type: ObjectId,
      ref: "User",
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, timeseries: true }
);

module.exports = mongoose.model("Orders", OrdersSchema);
