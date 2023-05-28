const verifyTokenSocket = require("./middleware/socketMiddleware");
const {
  newConnectionHandler,
  disconnectHandler,
  setSocketServerInstance,
} = require("./controllers/socketControllers");
const registerSocketServer = (server) => {
  console.log("Registered Socket");
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      method: ["GET", "POST"],
    },
  });
  setSocketServerInstance(io);
  io.use((socket, next) => {
    verifyTokenSocket(socket, next);
  });

  io.on("connection", (socket) => {
    console.log("User connected");
    newConnectionHandler(socket, io);

    socket.on("disconnect", () => {
      console.log("disconnected");
      disconnectHandler(socket);
    });
  });
};

module.exports = {
  registerSocketServer,
};
