const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    // Check if user already exists
    const userExists = await User.exists({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(409).json({ message: "Email already in use." });
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user document
    const user = await User.create({
      firstName,
      lastName,
      password: encryptedPassword,
      email: email.toLowerCase(),
    });

    const token = generateToken(user);
    res.status(201).json({
      userDetails: {
        email,
        firstName,
        lastName,
        token,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists && (await bcrypt.compare(password, userExists.password))) {
      const token = generateToken(userExists);

      res.status(200).json({
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        bio: userExists.bio,
        email: userExists.email,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid user credentials" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  register,
  login,
};
