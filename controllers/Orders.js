const Chaya = require("../models/Chaya");
const Orders = require("../models/Orders");
const mongoose = require("mongoose");

//add price
const addPrice = async (req, res) => {
  try {
    const { category, price } = req.body;
    if (!category || !price) {
      return res.status(422).json({ error: "Please add the Fields" });
    }
    const result = await Chaya.create({
      category: category,
      price: price,
    });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};
//get price
const getPrice = async (req, res) => {
  try {
    const result = await Chaya.find({});

    if (!result) {
      return res.status(404).json({ msg: "No item " });
    }
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
//update price
const updatePrice = async (req, res) => {
  try {
    const { chaya_id } = req.params;

    const chayaDetails = await Chaya.findOneAndUpdate(
      { _id: chaya_id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!chayaDetails) {
      return res.status(404).json({ success: false, msg: "Item Not Found" });
    }
    res
      .status(200)
      .json({ success: true, msg: "Update Successful", chayaDetails });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
//add order
const addChaya = async (req, res) => {
  const { name, ordered_by, chaya_id } = req.body;

  if (!name || !ordered_by || !chaya_id) {
    return res.status(422).json({ error: "Please add the Fields" });
  }

  const chayaItem = await Chaya.findById(chaya_id);

  if (!chayaItem) {
    return res.status(404).json({ msg: "Chaya item not found" });
  }

  console.log(chayaItem.price);

  const order = new Orders({
    name,
    ordered_by,
    amount: chayaItem.price,
    time: new Date().toLocaleTimeString("en-US"),
  });
  order
    .save()
    .then((result) => {
      res.json({ order: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
//get order details
const getOrder = async (req, res) => {
  try {
    const { user_Id } = req.params;

    if (!user_Id) {
      return res.status(400).json({ msg: "Please Pass a valid ID" });
    }
    // Convert user_Id to an ObjectId
    const objectId = new mongoose.Types.ObjectId(user_Id);

    // Query the database using the ObjectId
    const result = await Orders.find({
      ordered_by: objectId,
    });

    if (!result) {
      res
        .status(404)
        .json({ msg: `There is No Order placed by user id ${user_Id}` });
    }

    const final = result.reduce((prevValue, currValue) => {
      return prevValue + currValue.amount;
    }, 0);

    res.status(200).json({ success: true, data: result, totalAmount: final });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addChaya,
  getOrder,
  addPrice,
  getPrice,
  updatePrice,
};
