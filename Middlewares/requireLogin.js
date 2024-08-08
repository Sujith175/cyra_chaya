const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "you must be LoggedIn to drink Chaya" });
  }
  const token = authorization.replace("Bearer", "");
  jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({ error: "Please You must be login" });
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
