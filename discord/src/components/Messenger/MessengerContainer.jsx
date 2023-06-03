import { useEffect } from "react";
import Messages from "./Messages";
import { connect } from "react-redux";
import { getDirectChatHistory } from "../../realTimeCommunication/socketConnect.js";
import { format } from "date-fns";

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
        {Object.keys(clubbedMessages).map((i) => {
          return (
            <>
              <div className="w-full text-center">
                <span className="badge badge-neutral">{i}</span>
              </div>
              <div className="flex flex-col overflow-y-auto align-bottom pb-9">
                {clubbedMessages[i].map((j) => {
                  return (
                    <>
                      <Messages
                        message={j.content}
                        key={j._id}
                        author={j.author._id == chosenChatDetails.id}
                        createdAt={format(new Date(j.createdAt), "HH:MM:SS")}
                      />
                    </>
                  );
                })}
              </div>
            </>
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
