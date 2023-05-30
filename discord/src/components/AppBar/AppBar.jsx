import style from "./AppBar.module.css";
import ChatLabel from "./ChatLabel";
const AppBar = () => {
  return (
    <div className={style.wrapper}>
      <ChatLabel />
    </div>
  );
};

export default AppBar;
