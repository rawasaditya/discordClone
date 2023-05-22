import style from "./styles/dashBoard.module.css";
import SideBar from "../components/SideBar/SideBar";
import FriendsSideBar from "../components/FriendsSideBar/FriendsSideBar";
import Messenger from "../components/Messenger/Messenger";
const DashBoard = () => {
  return (
    <div className={style.dc_wrapper}>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
    </div>
  );
};

export default DashBoard;
