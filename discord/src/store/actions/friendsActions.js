import { toast } from "react-toastify";
import * as api from "../../api";

export const fiendsActions = {
  SET_FRIENDS: "FRIENDS.SET_FRIENDS",
  SET_PENDING_FRIENDS_INVITATIONS: "SET_PENDING_FRIENDS_INVITATIONS",
  SET_ONLINE_USERS: "FRIENDS.SET_ONLINE_USERS",
};

export const getActions = (dispatch) => {
  return {
    sendFriendInvitation: (data) => dispatch(sendFriendInvitation(data)),
  };
};

const sendFriendInvitation = (data) => {
  return async () => {
    const response = await api.sendFriendInvitation(data);
    if (response.error) {
      console.log(response);
      toast.error(response.exception?.response?.data?.message);
      return false;
    } else {
      toast.success("Invitation has been sent ...!");
      return true;
    }
  };
};
