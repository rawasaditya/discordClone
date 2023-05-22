import style from "./SideBar.module.css";
import MainPageButton from "./MainPageButton";
const SideBar = () => {
  return (
    <div className={style.dc_sideBar}>
      <MainPageButton />
    </div>
  );
};

export default SideBar;
