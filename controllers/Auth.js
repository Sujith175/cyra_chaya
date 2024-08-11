const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Orders = require("../models/Orders");

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "Please Provide email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_SECRET
          );
          const { _id, name } = savedUser;
          res.json({ token, user: { _id, name, userStatus } });
        } else {
          return res.status(422).json({ error: "Invalid Credentials" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

const signUp = (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({ error: "Please add all the Fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "User Already Exists with that email" });
    }
    bcrypt
      .hash(password, 13)
      .then((hashedPassword) => {
        const user = new User({
          email,
          name,
          userStatus,
          password: hashedPassword,
        });
        user
          .save()
          .then(() => {
            res.json({ message: "User Added Successfuly" });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

module.exports = {
  login,
  signUp,
};
