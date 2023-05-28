import io from "socket.io-client";
import packageJson from "../../package.json";
import { setPendingFriendsInvitation } from "../store/actions/friendsActions";
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
};
