const jwt = require("jsonwebtoken");
const config = process.env;
const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Authentication failed !" });
  }
  try {
    token = token.replace(/^Bearer\s+/, "");
    const decode = jwt.verify(token, config.TOKEN_KEY);
    req.user = decode;
  } catch (err) {
    res.status(500).json(err);
  }

  return next();
};

module.exports = { verifyToken };
