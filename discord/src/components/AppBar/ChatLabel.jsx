import { connect } from "react-redux";
import CreateRoomButton from "../SideBar/CreateRoomButton";

const ChatLabel = ({ chosenChatDetails }) => {
  const { firstName, lastName, id } = chosenChatDetails
    ? chosenChatDetails
    : { firstName: undefined, lastName: undefined };
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
            <CreateRoomButton id={id} className="text-2xl btn btn-ghost" />
          </div>
        </div>
      )}
    </>
  );
};

const mapStatesToProps = ({ chatReducer }) => {
  return {
    ...chatReducer,
  };
};

export default connect(mapStatesToProps)(ChatLabel);
