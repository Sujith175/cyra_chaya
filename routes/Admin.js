const express = require("express");
const {
  getUsers,
  clearOrder,
  changeStatus,
  getOrdersOnTime,
} = require("../controllers/Admin");

const router = express.Router();

router.get("/getusers", getUsers);
router.delete("/clearorder/:user_Id", clearOrder);
router.patch("/changestatus/:user_Id", changeStatus);
router.get("/getordersontime", getOrdersOnTime);

module.exports = router;
