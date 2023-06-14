import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { useState } from "react";
import { BsMicMuteFill, BsFillMicFill } from "react-icons/bs";
import { ImPhoneHangUp } from "react-icons/im";
import { AiOutlineVideoCamera } from "react-icons/ai";

import style from "../SideBar/SideBar.module.css";
const ChatRoom = () => {
  const initialState = true;
  const [camera, setCamera] = useState(initialState);
  const [mic, setMic] = useState(!initialState);
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="chatRoomModal" className={style.homeBtn}>
        <AiOutlineVideoCameraAdd />
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="chatRoomModal" className="modal-toggle" />
      <div className="modal">
        <div className="flex flex-col w-11/12 h-full max-w-full modal-box">
          <div className="flex-1 py-4">
            <div className="flex justify-center gap-4">
              <figure className="overflow-hidden rounded-lg">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Movie"
                />
              </figure>
              <figure className="overflow-hidden rounded-lg">
                <img
                  src="https://images.pexels.com/photos/1456951/pexels-photo-1456951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Movie"
                />
              </figure>
            </div>
          </div>
          <div className="justify-center modal-action">
            <button
              className={`text-white btn btn-circle ${
                mic ? "btn-primary" : ""
              }`}
              onClick={() => setMic((prev) => !prev)}
            >
              {mic ? (
                <BsFillMicFill fontSize={20} />
              ) : (
                <BsMicMuteFill fontSize={20} />
              )}
            </button>
            <label
              htmlFor="chatRoomModal"
              className="text-white btn btn-circle btn-error"
            >
              <ImPhoneHangUp fontSize={20} />
            </label>
            <button
              className={`text-white btn btn-circle ${
                camera ? "btn-primary" : ""
              }`}
              onClick={() => setCamera((prev) => !prev)}
            >
              <AiOutlineVideoCamera fontSize={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
