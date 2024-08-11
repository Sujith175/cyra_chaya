const express = require("express");
const { addChaya, getOrder, addPrice } = require("../controllers/Orders");

const router = express.Router();

router.post("/addchaya", addChaya);
router.get("/getchaya/:user_Id", getOrder);
router.post("/addprice", addPrice);
module.exports = router;
