import style from "./SideBar.module.css";
import MainPageButton from "./MainPageButton";
import AddFriendButton from "./AddFriendButton";
import CreateRoomButton from "./CreateRoomButton";

const SideBar = () => {
  return (
    <div className={style.dc_sideBar}>
      <MainPageButton />
      <AddFriendButton className={style.homeBtn} />
      <CreateRoomButton className={style.homeBtn} />
    </div>
  );
};

export default SideBar;
