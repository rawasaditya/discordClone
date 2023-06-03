import { useEffect } from "react";
import Messages from "./Messages";
import { connect } from "react-redux";
import { getDirectChatHistory } from "../../realTimeCommunication/socketConnect.js";
const MessengerContainer = ({ chosenChatDetails, messages }) => {
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);
  return (
    <div className="h-full py-3 overflow-y-auto">
      <div className="flex-1">
        <div className="flex flex-col overflow-y-auto align-bottom pb-9 ">
          {messages.map((i) => {
            return (
              <Messages
                message={i.content}
                key={i._id}
                author={i.author._id == chosenChatDetails.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStoreStateToProps = ({ chatReducer }) => {
  return chatReducer;
};

export default connect(mapStoreStateToProps)(MessengerContainer);
