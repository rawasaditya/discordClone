import style from "./AppBar.module.css";
import ProfileDropDown from "./ProfileDropDown";
const AppBar = () => {
  return (
    <div className={style.wrapper}>
      <ProfileDropDown />
    </div>
  );
};

export default AppBar;
