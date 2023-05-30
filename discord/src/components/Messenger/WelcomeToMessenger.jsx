import { connect } from "react-redux";
import InviteFriends from "./InviteFriends";
import StartChatMessage from "./StartChatMessage";
const WelcomeToMessenger = ({ friends }) => {
  return <div>{friends.length ? <StartChatMessage /> : <InviteFriends />}</div>;
};

const mapStoreStateToProps = ({ friends }) => {
  return friends;
};
export default connect(mapStoreStateToProps)(WelcomeToMessenger);
