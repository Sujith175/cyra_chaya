const express = require("express");
const { addChaya, getOrder } = require("../controllers/Orders");

const router = express.Router();

router.post("/addchaya", addChaya);
router.get("/getchaya/:user_Id", getOrder);

module.exports = router;
