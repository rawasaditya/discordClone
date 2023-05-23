const connectedUsers = new Map();

const addNewConnectedUser = ({ socketId, userId }) => {
  const values = [...connectedUsers.values()];
  const keys = [...connectedUsers.keys()];

  const ids = values.map((i) => i.userId);
  const existingIDidx = ids.indexOf(userId);
  if (existingIDidx > -1) {
    connectedUsers.set(keys[existingIDidx], { userId });
    connectedUsers.delete(keys[existingIDidx]);
    connectedUsers.set(socketId, { userId });
  } else {
    connectedUsers.set(socketId, { userId });
  }
};

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });
};

const disconnectHandler = (socket) => {
  if (connectedUsers.has(socket.id)) {
    connectedUsers.delete(socket.id);
  }
  console.log("NEW USERS");
  console.log(connectedUsers);
};
module.exports = {
  newConnectionHandler,
  connectedUsers,
  addNewConnectedUser,
  disconnectHandler,
};
