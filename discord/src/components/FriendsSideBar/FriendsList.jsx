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
    return friends.map((i, idx) => {
      if (i._id === onlineUsers[idx]?.userId) {
        return {
          ...i,
          isOnline: true,
        };
      } else {
        return {
          ...i,
          isOnline: false,
        };
      }
    });
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
