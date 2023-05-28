import FriendsListsItem from "./FriendsListsItem.jsx";
import { connect } from "react-redux";
const FriendsList = ({ friends }) => {
  return (
    <div className="flex-grow w-full px-2">
      {friends?.map((i) => {
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
