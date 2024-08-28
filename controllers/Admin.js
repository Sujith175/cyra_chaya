const Orders = require("../models/Orders");
const User = require("../models/user");
const mongoose = require("mongoose");

const getUsers = async (req, res) => {
  try {
    const userDetails = await User.find({});
    if (!userDetails) {
      return res.status(400).json({
        msg: "Can't get user Information right now, Please try again later",
      });
    }
    res.status(200).json({ success: true, data: userDetails });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

const clearOrder = async (req, res) => {
  try {
    const { user_Id } = req.params;

    if (!user_Id) {
      return res.status(400).json({ msg: "Please Pass a valid ID" });
    }

    // Convert user_Id to an ObjectId
    const objectId = new mongoose.Types.ObjectId(user_Id);

    const result = await Orders.deleteMany({ ordered_by: objectId });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ msg: `No orders found for user ID ${user_Id}` });
    }
    res
      .status(200)
      .json({ msg: `Successfully deleted ${result.deletedCount} orders` });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { user_Id } = req.params;

    if (!user_Id) {
      return res.status(400).json({ msg: "Please provide a valid ID" });
    }

    const userStatus = await User.findOneAndUpdate(
      { _id: user_Id },
      { activeUser: "inActive" },
      { new: true, runValidators: true }
    );

    if (!userStatus) {
      return res
        .status(404)
        .json({ success: false, msg: "Cannot update, please check the ID" });
    }

    res
      .status(200)
      .json({ success: true, msg: "Update successful", userStatus });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orderDetails = await Orders.find({});

    if (!orderDetails || orderDetails.length === 0) {
      return res.status(404).json({
        msg: "Sorry, Orders Not Found",
      });
    }

    const orders = orderDetails.map((order) => {
      const { _id: orderId, name, ordered_by, time, createdAt } = order;
      return {
        orderId,
        name,
        ordered_by,
        time,
        createdAt,
      };
    });

    res.status(200).json({
      success: true,
      data: orders,
      totalCount: orderDetails.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getUsers,
  clearOrder,
  changeStatus,
  getOrders,
};
