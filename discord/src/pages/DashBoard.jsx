import { useEffect } from "react";
import style from "./styles/dashBoard.module.css";
import SideBar from "../components/SideBar/SideBar";
import FriendsSideBar from "../components/FriendsSideBar/FriendsSideBar";
import Messenger from "../components/Messenger/Messenger";
import { logout } from "../utils/authUtils.js";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions.js";
import { connectWithSocketServer } from "../realTimeCommunication/socketConnect.js";
const DashBoard = ({ setUserDetails }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) {
      logout();
    }
    setUserDetails(JSON.parse(userDetails));
    connectWithSocketServer();
  }, []);
  return (
    <div className={style.dc_wrapper}>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(DashBoard);
