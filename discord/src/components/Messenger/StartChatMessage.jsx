import chatLogo from "../../assets/undraw_chat_bot_re_e2gj.svg";
const StartChatMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center align-middle">
      <img src={chatLogo} className="h-96 w-96" />
      <span className="font-semibold underline uppercase underline-offset-4 ">
        Start chatting seamlessly with your friends{" "}
      </span>
    </div>
  );
};

export default StartChatMessage;
