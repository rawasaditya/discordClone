const User = require("../models/User");
const FriendsInvitations = require("../models/FriendsInvitations");
const connectedUsers = new Map();
let io = null;

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
const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
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
};

const getActiveConnections = (userId) => {
  const activesUsers = [];
  connectedUsers.forEach((key, value) => {
    if (key.userId === userId) {
      activesUsers.push(value);
    }
  });
  return activesUsers;
};

// UPDATE FRIENDS PENDING INVITE
const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendsInvitations.find({
      receiverId: userId,
    }).populate("senderId", "firstName lastName email");
    const receiverList = getActiveConnections(userId);
    const io = getSocketServerInstance();
    receiverList.forEach((receiverId) => {
      io.to(receiverId).emit("friends-invitation", {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  newConnectionHandler,
  connectedUsers,
  addNewConnectedUser,
  disconnectHandler,
  setSocketServerInstance,
  updateFriendsPendingInvitations,
};
