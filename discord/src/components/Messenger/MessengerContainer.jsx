import { useEffect } from "react";
import { connect } from "react-redux";
import { getDirectChatHistory } from "../../realTimeCommunication/socketConnect.js";
import { format } from "date-fns";
import MessagesWrapper from "./MessagesWrapper";

const MessengerContainer = ({ chosenChatDetails, messages }) => {
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);
  const clubByDate = () => {
    let dateClubbedMessages = {};
    messages.map((i) => {
      const hasDateIncluded = format(new Date(i.createdAt), "dd/MM/yyyy");
      if (Object.keys(dateClubbedMessages).includes(hasDateIncluded)) {
        dateClubbedMessages[hasDateIncluded].push(i);
      } else {
        dateClubbedMessages[hasDateIncluded] = [i];
      }
    });
    return dateClubbedMessages;
  };
  let clubbedMessages = clubByDate();
  return (
    <div className="h-full py-3 overflow-y-auto">
      <div className="flex-1">
        {Object.keys(clubbedMessages).map((i, idx) => {
          return (
            <MessagesWrapper
              key={idx}
              clubbedMessages={clubbedMessages}
              date={i}
              chosenChatDetails={chosenChatDetails}
            />
          );
        })}
      </div>
    </div>
  );
};

const mapStoreStateToProps = ({ chatReducer }) => {
  return chatReducer;
};

export default connect(mapStoreStateToProps)(MessengerContainer);
