import style from "./SideBar.module.css";
import MainPageButton from "./MainPageButton";
import AddFriendButton from "./AddFriendButton";
import CharRoom from "../ChatRoom/ChatRoom";
const SideBar = () => {
  return (
    <div className={style.dc_sideBar}>
      <MainPageButton />
      <AddFriendButton className={style.homeBtn} />
      {/* <CharRoom /> */}
    </div>
  );
};

export default SideBar;
