const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ message: "Please Provide email or password" });
    }

    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
      return res.status(422).json({ message: "Invalid Credentials" });
    }

    const doMatch = await bcrypt.compare(password, savedUser.password);
    if (doMatch) {
      const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const { _id, name, userStatus } = savedUser;
      return res.json({ token, user: { _id, name, userStatus } });
    } else {
      return res.status(422).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signUp = async (req, res) => {
  try {
    const { name, email, password, activeUser } = req.body;

    if (!email || !name || !password) {
      return res.status(422).json({ error: "Please add all the Fields" });
    }

    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      return res
        .status(422)
        .json({ message: "User Already Exists with that email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Encrypting the password with a salt of 10 rounds

    const user = new User({
      email,
      name,
      password: hashedPassword, // Storing the hashed password
      activeUser,
    });

    await user.save();
    res.json({ message: "User Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  login,
  signUp,
};
