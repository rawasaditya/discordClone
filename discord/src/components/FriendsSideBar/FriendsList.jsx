import FriendsListsItem from "./FriendsListsItem.jsx";
const FriendsList = () => {
  const DUMMY_FRIENDS = [
    {
      id: 1,
      firstName: "Pruthvi",
      lastName: "Shelke",
      isOnline: true,
    },
    {
      id: 2,
      firstName: "Pruthvi",
      lastName: "Shelke",
      isOnline: false,
    },
    {
      id: 3,
      firstName: "Pruthvi",
      lastName: "Shelke",
      isOnline: false,
    },
    {
      id: 4,
      firstName: "Pruthvi",
      lastName: "Shelke",
      isOnline: true,
    },
    {
      id: 5,
      firstName: "Chandrakant",
      lastName: "Rawas",
      isOnline: true,
    },
  ];
  return (
    <div className="flex-grow w-full px-2">
      {DUMMY_FRIENDS.map((i) => {
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

export default FriendsList;
