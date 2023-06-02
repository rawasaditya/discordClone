import { useEffect } from "react";
import style from "./Messenger.module.css";
import AppBar from "../AppBar/AppBar";
import { connect } from "react-redux";
import WelcomeToMessenger from "./WelcomeToMessenger";
import MessengerContainer from "./MessengerContainer";
import MessageInput from "./MessageInput";
const Messenger = ({ chosenChatDetails }) => {
  useEffect(() => {}, [chosenChatDetails]);
  return (
    <div className={style.wrapper}>
      <AppBar />
      {!chosenChatDetails ? (
        <div className={style.messengerWrapper}>
          <WelcomeToMessenger />
        </div>
      ) : (
        <>
          <MessengerContainer />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const mapStoreStateToProps = ({ chatReducer }) => {
  return chatReducer;
};
export default connect(mapStoreStateToProps)(Messenger);
