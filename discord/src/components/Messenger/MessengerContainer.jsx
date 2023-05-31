import Messages from "./Messages";
const MessengerContainer = () => {
  return (
    <div className="h-full py-3 overflow-y-auto">
      <div className="flex-1">
        <Messages />
      </div>
      <div className="flex w-auto "></div>
    </div>
  );
};

export default MessengerContainer;
