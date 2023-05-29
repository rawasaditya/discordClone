import { useEffect } from "react";
import FriendsListsItem from "./FriendsListsItem.jsx";
import { connect } from "react-redux";
import { getAllFriends } from "../../api.js";
import store from "../../store/store.js";
import { setFriends } from "../../store/actions/friendsActions.js";
const FriendsList = ({ friends, onlineUsers }) => {
  useEffect(() => {
    const resp = getAllFriends();
    resp.then((res) => {
      if (res?.data?.friends?.friends?.length) {
        store.dispatch(setFriends(res?.data?.friends?.friends));
      }
    });
  }, []);

  const checkOnlineUsers = (friends = [], onlineUsers = []) => {
    const onlineUsersList = onlineUsers.map((i) => i.userId);
    const users = friends.map((i) => {
      return {
        ...i,
        isOnline: onlineUsersList.includes(i._id),
      };
    });
    return users;
  };

  return (
    <div className="flex-grow w-full px-2">
      {checkOnlineUsers(friends, onlineUsers)?.map((i) => {
        return (
          <FriendsListsItem
            id={i.id}
            firstName={i.firstName}
            isOnline={i.isOnline}
            lastName={i.lastName}
            key={i.id}
          />
        );
      })}
    </div>
  );
};

const mapStoreStateToProps = ({ friends }) => {
  return friends;
};

export default connect(mapStoreStateToProps)(FriendsList);
