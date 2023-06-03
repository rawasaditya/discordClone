const Messages = ({ message, author }) => {
  return (
    <div className={`chat chat-${!author ? "end" : "start"}`}>
      <div
        className={`chat-bubble chat-bubble-${!author ? "accent" : "primary"}`}
      >
        {message}
      </div>
    </div>
  );
};

export default Messages;
