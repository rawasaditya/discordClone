import io from "socket.io-client";
import packageJson from "../../package.json";
import {
  setPendingFriendsInvitation,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsActions";
import store from "../store/store";
import { updateDirectChatHistoryIfActive } from "./socketutils";
import { toast } from "react-toastify";
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
};

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  socket?.emit("direct-chat-history", data);
};
