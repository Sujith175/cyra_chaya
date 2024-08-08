const express = require("express");
const { login, signUp } = require("../controllers/Auth");
const { addChaya } = require("../controllers/Orders");

const router = express.Router();

router.post("/addchaya", addChaya);

module.exports = router;
