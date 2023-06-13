import { useState } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import * as roomHandler from "../../realTimeCommunication/roomHandler.js";
import { ImPhoneHangUp } from "react-icons/im";
import { BsMicMuteFill, BsFillMicFill } from "react-icons/bs";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { MdOutlineScreenShare } from "react-icons/md";
import CallingIndicator from "../FriendsSideBar/CallingIndicator";
const CreateRoomButton = ({ className, id, isCalling, roomDetails }) => {
  const initialState = true;
  const [camera, setCamera] = useState(initialState);
  const [shareScreen, setShareScreen] = useState(!initialState);
  const [mic, setMic] = useState(!initialState);
  return (
    <>
      {!isCalling ? (
        <label
          htmlFor="chatRoomModal"
          className={`${className} flex gap-4`}
          onClick={() => roomHandler.createNewRoom(id)}
        >
          <AiOutlineVideoCameraAdd />
        </label>
      ) : (
        <label
          htmlFor="chatRoomModal"
          className={`${className} flex gap-4`}
          onClick={() =>
            roomHandler.joinExistingRoom(roomDetails.roomDetails.roomId)
          }
        >
          <AiOutlineVideoCameraAdd />
          <CallingIndicator />
        </label>
      )}
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
            <button
              className={`text-white btn btn-circle ${
                shareScreen ? "btn-primary" : ""
              }`}
              onClick={() => setShareScreen((prev) => !prev)}
            >
              <MdOutlineScreenShare fontSize={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRoomButton;
