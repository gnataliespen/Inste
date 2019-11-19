const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const { jwtSecret } = require("../config/config");

//@route POST /auth/signup
//@desc Register user
//@access Public
exports.signUp = async (req, res) => {
  const { username, email, password, avatar } = req.body;

  try {
    //Check for existing user
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ msg: "Email already in use" });
    }

    //Hash password & create user
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      avatar,
      password: hashPass
    });

    //Create and return token
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: "1d"
    });
    res.status(201).json(token);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error, failed to register user" });
  }
};

//@route POST /auth/login
//@desc Login user
//@access Public
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Find user
    const user = await User.findOne({ email }).select("+password");
    //Check if user exists
    if (!user) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
    //Verify password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      //Create and send token
      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "1d"
      });
      return res.status(200).json(token);
    } else {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error, failed to login user" });
  }
};

//@route GET /auth
//@desc Get user
//@access Private
exports.getUser = async (req, res) => {
  try {
    //Get and verify token
    const token = req.header("x-auth-token");
    const user = await auth(token);

    //If valid token find and return user
    if (!user) return res.status(401).json({ msg: "Not authorized" });
    const verifiedUser = await User.findById(user);
    res.status(200).json(verifiedUser);
  } catch (err) {
    return res.status(401).json({ msg: "Not authorized" });
  }
};
