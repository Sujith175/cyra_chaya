const express = require("express");
const {
  addChaya,
  getOrder,
  addPrice,
  getPrice,
  updatePrice,
} = require("../controllers/Orders");

const router = express.Router();

router.post("/addchaya", addChaya);
router.get("/getchaya/:user_Id", getOrder);
router.post("/addprice", addPrice);
router.get("/getprice", getPrice);
router.patch("/updateprice/:chaya_id", updatePrice);

module.exports = router;
