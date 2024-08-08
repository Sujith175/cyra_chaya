const express = require("express");
const { login, signUp } = require("../controllers/Auth");

const router = express.Router();

router.post("/login", login);

router.post("/adduser", signUp);

module.exports = router;
