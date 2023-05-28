import PendingInvitationItem from "./PendingInvitationItem";
import { connect } from "react-redux";
const PendingInvitationList = ({ pendingFriendsInvitations }) => {
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
