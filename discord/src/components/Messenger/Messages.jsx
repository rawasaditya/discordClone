const Messages = ({ message, author, createdAt }) => {
  return (
    <>
      <div className={`chat chat-${author ? "start" : "end"}`}>
        <div
          className={`chat-bubble chat-bubble-${author ? "primary" : "accent"}`}
        >
          <span className="">{message}</span>
        </div>
        <div
          className={`w-full text-xs text-${
            author ? "left" : "right"
          } opacity-50 chat-footer`}
        >
          {createdAt}
        </div>
      </div>
    </>
  );
};

export default Messages;
