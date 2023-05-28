import io from "socket.io-client";
import packageJson from "../../package.json";
import {
  setPendingFriendsInvitation,
  setFriends,
} from "../store/actions/friendsActions";
import store from "../store/store";
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
    console.log(data);
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });
};
