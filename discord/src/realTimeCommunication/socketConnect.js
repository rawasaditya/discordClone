import io from "socket.io-client";
import packageJson from "../../package.json";
import {
  setPendingFriendsInvitation,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsActions";
import { setRoomDetails } from "../store/actions/roomActions";
import store from "../store/store";
import { updateDirectChatHistoryIfActive } from "./socketutils";
import { toast } from "react-toastify";
import { newRoomCreated, exitParticipants } from "./roomHandler";
let socket = null;

export const connectWithSocketServer = (userDetails) => {
  socket = io(packageJson.proxy, {
    auth: {
      jwtToken: userDetails.token,
    },
  });
  socket.on("connect", () => {
    console.log("successfully connected with socket server");
  });

  socket.on("friends-invitation", (data) => {
    const { pendingInvitations } = data;
    toast.info("You have received an invite");
    store.dispatch(setPendingFriendsInvitation(pendingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });

  socket.on("online-users", (data) => {
    store.dispatch(setOnlineUsers(data.onlineUsers ? data.onlineUsers : []));
  });
  socket.on("direct-chat-history", (data) => {
    updateDirectChatHistoryIfActive(data);
  });
  socket.on("room-create", (data) => {
    newRoomCreated(data);
  });
  socket.on("active-rooms", (data) => {
    store.dispatch(setRoomDetails(data));
  });
  socket.on("join-rooms", (data) => {
    store.dispatch(setRoomDetails(data));
  });

  socket.on("participant-updates", (data) => {
    console.log(data);
    exitParticipants(data);
  });
};

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  socket?.emit("direct-chat-history", data);
};

export const createNewRoom = (id) => {
  socket?.emit("room-create", id);
};

export const exitRoom = (id) => {
  socket?.emit("room-exit", id);
};

export const joinExistingRoom = (id) => {
  socket?.emit("room-join", id);
};
