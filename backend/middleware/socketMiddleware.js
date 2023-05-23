const jwt = require("jsonwebtoken");

const TOKEN_KEY = process.env.TOKEN_KEY;

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.jwtToken;
  try {
    const decode = jwt.verify(token, TOKEN_KEY);
    socket.user = decode;
  } catch (err) {
    const socketError = new Error("Not authorized");
    return next(socketError);
  }
  next();
};

module.exports = verifyTokenSocket;
