const express = require("express");
require("dotenv").config();
const app = express();
const auth = require("./routes/Auth");
const connectDB = require("./DB/Connect");
const addChaya = require("./routes/Order");
const admin = require("./routes/Admin");

app.use(express.json());

app.use("/api/admin", admin);
app.use("/api/user", auth);
app.use("/api/orders", addChaya);

const port = 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
