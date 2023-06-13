const verifyTokenSocket = require("./middleware/socketMiddleware");
const {
  newConnectionHandler,
  disconnectHandler,
  setSocketServerInstance,
  getOnlineUsers,
  directMessageHandler,
  directChatHistoryHandler,
  roomCreateHandler,
  roomJoinHandler,
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

  const emitOnlineUsers = () => {
    const onlineUsers = getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    console.log("User connected");
    emitOnlineUsers();
    newConnectionHandler(socket, io);

    socket.on("disconnect", () => {
      console.log("disconnected");
      disconnectHandler(socket);
    });

    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data);
    });

    socket.on("direct-chat-history", (data) => {
      directChatHistoryHandler(socket, data);
    });
    socket.on("room-create", (data) => {
      roomCreateHandler(socket, data);
    });
    socket.on("room-join", (data) => {
      roomJoinHandler(socket, data);
    });
  });
  setInterval(() => {
    emitOnlineUsers();
  }, [8000]);
};

module.exports = {
  registerSocketServer,
};
