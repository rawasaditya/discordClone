import style from "./SideBar.module.css";
import MainPageButton from "./MainPageButton";
import AddFriendButton from "./AddFriendButton";
const SideBar = () => {
  return (
    <div className={style.dc_sideBar}>
      <AddFriendButton />
      <MainPageButton />
    </div>
  );
};

export default SideBar;
