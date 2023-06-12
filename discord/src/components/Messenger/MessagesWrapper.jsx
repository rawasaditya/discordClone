import Messages from "./Messages";
import { format } from "date-fns";

const MessagesWrapper = ({ clubbedMessages, date, chosenChatDetails }) => {
  return (
    <div>
      <div className="flex flex-col overflow-y-auto align-bottom pb-9">
        <div className="w-full text-center">
          <span className="badge badge-neutral">{date}</span>
        </div>
        {clubbedMessages[date].map((j) => {
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
    </div>
  );
};

export default MessagesWrapper;
