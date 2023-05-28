import { useEffect } from "react";
import PendingInvitationItem from "./PendingInvitationItem";
import { connect } from "react-redux";
import store from "../../store/store.js";
import { getAllFriendInvites } from "../../api.js";
import { setPendingFriendsInvitation } from "../../store/actions/friendsActions";
const PendingInvitationList = ({ pendingFriendsInvitations }) => {
  useEffect(() => {
    async function getinvites() {
      const resp = getAllFriendInvites();
      resp.then((res) => {
        return res;
      });
      return resp;
    }
    const resp = getinvites();
    resp.then((data) => {
      store.dispatch(setPendingFriendsInvitation(data.data));
    });
  }, []);

  return (
    <div className="flex flex-col items-center w-full px-2 overflow-auto h-1/5">
      {pendingFriendsInvitations?.map((i) => {
        return (
          <PendingInvitationItem
            key={i._id}
            id={i._id}
            firstName={i.senderId.firstName}
            lastName={i.senderId.lastName}
            email={i.senderId.email}
          />
        );
      })}
    </div>
  );
};

const mapStoreStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export default connect(mapStoreStateToProps)(PendingInvitationList);
