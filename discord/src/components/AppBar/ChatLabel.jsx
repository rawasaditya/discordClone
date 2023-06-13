import { connect } from "react-redux";
import CreateRoomButton from "../SideBar/CreateRoomButton";

const ChatLabel = ({ chosenChatDetails, onlineUsers, roomDetails }) => {
  const { firstName, lastName, id } = chosenChatDetails
    ? chosenChatDetails
    : { firstName: undefined, lastName: undefined };
  const isOnline = onlineUsers.find((i) => {
    return i.userId === id;
  });
  const isCalling = roomDetails.find((i) => {
    return [i.from, i.to].includes(id);
  });
  return (
    <>
      {chosenChatDetails && (
        <div className="flex items-center w-full">
          <div className="flex items-center flex-1 w-full gap-2 px-3 py-3 ">
            <div className="flex items-center flex-1 gap-2">
              <div className={`avatar online} placeholder `}>
                <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
                  <span className="text-sm">{`${
                    firstName ? firstName.at(0) : ""
                  } 
          ${lastName ? lastName.at(0) : ""}
          `}</span>
                </div>
              </div>
              <span>
                {firstName} {lastName}
              </span>
            </div>
          </div>
          <div>
            <CreateRoomButton
              id={id}
              className={`${
                !isOnline?.userId ? "btn-disabled" : ""
              } text-2xl btn btn-ghost`}
              isCalling={isCalling?.from?.length > 0}
              roomDetails={isCalling}
            />
          </div>
        </div>
      )}
    </>
  );
};

const mapStatesToProps = ({ chatReducer, friends, room }) => {
  return {
    ...chatReducer,
    ...friends,
    ...room,
  };
};

export default connect(mapStatesToProps)(ChatLabel);
