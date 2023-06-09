import style from "./FriendsSideBar.module.css";
// import AddFriendButton from "./AddFriendButton.jsx";
import FriendsTitle from "./FriendsTitle";
import FriendsList from "./FriendsList";
import PendingInvitationList from "./PendingInvitationList";
import ProfileFooter from "./ProfileFooter";

const FriendsSideBar = () => {
  return (
    <div className={style.dc_friends_side_bar}>
      {/* <AddFriendButton /> */}
      <FriendsTitle title="Private Messages" />
      <FriendsList />
      <FriendsTitle title="Invitations" />
      <PendingInvitationList />
      <ProfileFooter />
    </div>
  );
};

export default FriendsSideBar;
