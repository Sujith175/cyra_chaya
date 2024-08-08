const Orders = require("../models/Orders");

const addChaya = (req, res) => {
  const { name, user_Id, amount } = req.body;

  if (!name || !user_Id || amount) {
    return res.status(422).json({ error: "Please add the Fields" });
  }

  const order = new Orders({
    name,
    user_Id,
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

module.exports = {
  addChaya,
};
