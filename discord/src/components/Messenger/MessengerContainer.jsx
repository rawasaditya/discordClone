import { useEffect } from "react";
import Messages from "./Messages";
import { connect } from "react-redux";

const MessengerContainer = ({ chosenChatDetails, messages }) => {
  useEffect(() => {}, [chosenChatDetails]);
  return (
    <div className="h-full py-3 overflow-y-auto">
      <div className="flex-1">
        <div className="flex flex-col overflow-y-auto align-bottom pb-9 ">
          <Messages />

          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-accent">
              That's never been done in the history of the Jedi. It's insulting!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStoreStateToProps = ({ chatReducer }) => {
  return chatReducer;
};

export default connect(mapStoreStateToProps)(MessengerContainer);
