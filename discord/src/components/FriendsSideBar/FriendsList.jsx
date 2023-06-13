import { useEffect } from "react";
import FriendsListsItem from "./FriendsListsItem.jsx";
import { connect } from "react-redux";
import { getAllFriends } from "../../api.js";
import store from "../../store/store.js";
import { setFriends } from "../../store/actions/friendsActions.js";
const FriendsList = ({ friends, onlineUsers, roomDetails }) => {
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
    const use = friends.map((i) => {
      return {
        ...i,
        isOnline: onlineUsersList.includes(i._id),
      };
    });

    const activeRoomDetails = roomDetails.map((i) => {
      return [i.from, i.to];
    });
    const users = use.map((i) => {
      if (activeRoomDetails.flat().includes(i._id)) {
        return {
          ...i,
          isCalling: true,
        };
      } else {
        return {
          ...i,
          isCalling: false,
        };
      }
    });
    return users;
  };

  return (
    <div className="flex-grow w-full px-2">
      {checkOnlineUsers(friends, onlineUsers)?.map((i) => {
        return (
          <FriendsListsItem
            id={i._id}
            firstName={i.firstName}
            isOnline={i.isOnline}
            lastName={i.lastName}
            key={i._id}
            isCalling={i.isCalling}
          />
        );
      })}
    </div>
  );
};

const mapStoreStateToProps = ({ friends, room }) => {
  return {
    ...friends,
    ...room,
  };
};

export default connect(mapStoreStateToProps)(FriendsList);
