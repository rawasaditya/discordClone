const registerSocketServer = (server) => {
  console.log("Registered Socket");
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      method: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("User connected");
    console.log(socket.id);
  });
};

module.exports = {
  registerSocketServer,
};
