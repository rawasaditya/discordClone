import style from "./Messenger.module.css";
import AppBar from "../AppBar/AppBar";
const Messenger = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.appBarWrapper}>
        <AppBar />
      </div>
    </div>
  );
};

export default Messenger;
