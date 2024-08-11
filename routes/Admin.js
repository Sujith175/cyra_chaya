const express = require("express");
const { getUsers, clearOrder } = require("../controllers/Admin");

const router = express.Router();

router.get("/getusers", getUsers);
router.delete("/clearorder/:user_Id", clearOrder);

module.exports = router;
