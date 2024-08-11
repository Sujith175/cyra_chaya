const Chaya = require("../models/Chaya");
const Orders = require("../models/Orders");
const mongoose = require("mongoose");

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
    res.status(500).json({ msg: error });
  }
};

const addChaya = (req, res) => {
  const { name, ordered_by } = req.body;

  if (!name || !ordered_by) {
    return res.status(422).json({ error: "Please add the Fields" });
  }

  const order = new Orders({
    name,
    ordered_by,
    amount: 10,
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

const getOrder = async (req, res) => {
  try {
    const { user_Id } = req.params;

    if (!user_Id) {
      return re.status(400).json({ msg: "Please Pass a valid ID" });
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
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addChaya,
  getOrder,
  addPrice,
};
