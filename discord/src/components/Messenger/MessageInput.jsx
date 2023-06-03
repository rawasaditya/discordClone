import { useState } from "react";
import { connect } from "react-redux";
import { sendDirectMessage } from "../../realTimeCommunication/socketConnect.js";
const MessageInput = ({ chosenChatDetails }) => {
  const [message, setMessage] = useState("");
  const handleMessageValueChange = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.which === 13 && message.length) {
      sendDirectMessage({
        receiverUserID: chosenChatDetails.id,
        content: message,
      });
      setMessage("");
    }
  };
  return (
    <div className="flex-1 w-full px-3 my-3 rounded-lg form-control">
      <input
        type="text"
        placeholder={`Write message to ${chosenChatDetails.firstName} ${chosenChatDetails.lastName} `}
        className="w-full input input-bordered"
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

const mapStoreStateToProps = ({ chatReducer }) => {
  return {
    ...chatReducer,
  };
};

export default connect(mapStoreStateToProps)(MessageInput);
