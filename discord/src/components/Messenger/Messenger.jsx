import style from "./Messenger.module.css";
import AppBar from "../AppBar/AppBar";
import { connect } from "react-redux";
import WelcomeToMessenger from "./WelcomeToMessenger";
const Messenger = ({ chosenChatDetails }) => {
  return (
    <div className={style.wrapper}>
      <div>
        <AppBar />
      </div>
      <div className={style.messengerWrapper}>
        {!chosenChatDetails ? <WelcomeToMessenger /> : ""}
      </div>
    </div>
  );
};

const mapStoreStateToProps = ({ chatReducer }) => {
  return chatReducer;
};
export default connect(mapStoreStateToProps)(Messenger);
