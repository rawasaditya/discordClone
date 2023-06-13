const User = require("../models/User");
const FriendsInvitations = require("../models/FriendsInvitations");
const Message = require("../models/Messages");
const Conversation = require("../models/Conversation");
const connectedUsers = new Map();
let activeRooms = [];
let io = null;

const addNewConnectedUser = ({ socketId, userId }) => {
  const values = [...connectedUsers.values()];
  const keys = [...connectedUsers.keys()];

  const ids = values.map((i) => i.userId);
  const existingIDidx = ids.lastIndexOf(userId);
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

const updateFriends = async (userId) => {
  try {
    const receiverList = getActiveConnections(userId);
    if (receiverList.length) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends",
        "_id firstName lastName email"
      );
      if (user) {
        const friendsLists = user.friends.map((i) => {
          return {
            id: i._id,
            firstName: i.firstName,
            lastName: i.lastName,
          };
        });

        // get io instance
        const io = getSocketServerInstance();
        receiverList.forEach((receiverId) => {
          io.to(receiverId).emit("friends-list", {
            friends: friendsLists ? friendsLists : [],
          });
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const getOnlineUsers = () => {
  const onlineUsers = [];
  connectedUsers.forEach((value, key) => {
    onlineUsers.push({
      socketId: key,
      userId: value.userId,
    });
  });
  return onlineUsers;
};

const updateChatHistory = async (conversationID, toSpecifiedSocket = null) => {
  const conversation = await Conversation.findById(conversationID).populate({
    path: "messages",
    model: "Messages",
    populate: {
      path: "author",
      model: "User",
      select: "firstName lastName _id",
    },
  });
  if (conversation) {
    const io = getSocketServerInstance();

    if (toSpecifiedSocket) {
      return io.to(toSpecifiedSocket).emit("direct-chat-history", {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }
    conversation.participants.forEach((userId) => {
      const activeConnections = getActiveConnections(userId.toString());
      activeConnections.forEach((socketId) => {
        io.to(socketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};

const directMessageHandler = async (socket, data) => {
  try {
    const { receiverUserID, content } = data;
    const author = socket.user.userId;
    // create new Message
    const message = await Message.create({
      content,
      author,
      type: "DIRECT",
    });

    // FIND IF CONVERSATION EXISTS IF NOT THEN CREATE
    const conversation = await Conversation.findOne({
      participants: { $all: [author, receiverUserID] },
    });
    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();
      updateChatHistory(conversation.id);
    } else {
      const conversation = await Conversation.create({
        participants: [author, receiverUserID],
        messages: [message._id],
        type: "DIRECT",
      });
      updateChatHistory(conversation.id);
    }
    // PERFORM AND UPDATE TO SENDER AND RECEIVER IF IS ONLINE
  } catch (err) {
    console.log(err);
  }
};

const directChatHistoryHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId } = data;

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
      type: "DIRECT",
    });
    if (conversation._id) {
      updateChatHistory(conversation.id, socket.id);
    }
  } catch (err) {
    console.log(err);
  }
};

// rooms
const roomCreateHandler = async (socket, callToId) => {
  const socketId = socket.id;
  const userId = socket.user.userId;
  const conversation = await Conversation.findOne({
    participants: { $all: [userId, callToId] },
  });
  const roomDetails = addNewActiveRoom(
    userId,
    socketId,
    conversation.id,
    callToId
  );
  socket.emit("room-create", { from: userId, to: callToId, roomDetails });
  updateRooms(userId, callToId, roomDetails);
};

const roomJoinHandler = async (socket, roomId) => {
  const socketId = socket.id;
  const userId = socket.user.userId;
  const idx = activeRooms.findIndex((i) => {
    return roomId === i.roomId;
  });
  if (idx > -1) {
    const isParticipant = activeRooms[idx].participants.findIndex((i) => {
      return i.userId === userId;
    });
    if (isParticipant > -1) {
      // activeRooms[idx].participants.splice(isParticipant, 1);
    } else {
      activeRooms[idx].participants = [
        ...activeRooms[idx].participants,
        {
          userId,
          socketId,
        },
      ];
    }
    joinParticipants(activeRooms[idx].participants, roomId);
  }
};

const addNewActiveRoom = (userId, socketId, conversationId) => {
  const newRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: conversationId,
  };
  activeRooms.push(newRoom);
  return newRoom;
};

const joinParticipants = (participants, roomId) => {
  const allOnlineUsers = getOnlineUsers();
  const socketIds = participants.map((i) => {
    return i.socketId;
  });
  const io = getSocketServerInstance();
  socketIds.map((i) => {
    io.to(i).emit("join-rooms", {
      participants,
      roomId,
    });
  });
};

const updateRooms = (from = null, to = null, roomDetails) => {
  const allOnlineUsers = getOnlineUsers();
  const toUser = allOnlineUsers.find((i) => {
    return i.userId == to;
  });
  if (toUser) {
    const io = getSocketServerInstance();
    io.to(toUser.socketId).emit("active-rooms", { from, to, roomDetails });
  }
};

module.exports = {
  newConnectionHandler,
  connectedUsers,
  addNewConnectedUser,
  disconnectHandler,
  setSocketServerInstance,
  updateFriendsPendingInvitations,
  updateFriends,
  getOnlineUsers,
  directMessageHandler,
  directChatHistoryHandler,
  roomCreateHandler,
  updateRooms,
  roomJoinHandler,
};
