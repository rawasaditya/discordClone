import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import * as roomHandler from "../../realTimeCommunication/roomHandler.js";
import { ImPhoneHangUp, ImVolumeMute2 } from "react-icons/im";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { MdOutlineScreenShare } from "react-icons/md";
const CreateRoomButton = ({ className }) => {
  return (
    <>
      <label
        htmlFor="chatRoomModal"
        className={className}
        onClick={roomHandler.createNewRoom}
      >
        <AiOutlineVideoCameraAdd />
      </label>
      <input type="checkbox" id="chatRoomModal" className="modal-toggle" />
      <div className="modal">
        <div className="flex flex-col w-11/12 h-full max-w-full modal-box">
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <div className="flex-1 py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </div>
          <div className="justify-center modal-action">
            <button className="text-white btn btn-circle ">
              <ImVolumeMute2 fontSize={20} />
            </button>
            <label
              htmlFor="chatRoomModal"
              className="text-white btn btn-circle btn-error"
            >
              <ImPhoneHangUp fontSize={20} />
            </label>

            <button className="text-white btn btn-circle btn-primary">
              <AiOutlineVideoCamera fontSize={20} />
            </button>
            <button className="text-white btn btn-circle ">
              <MdOutlineScreenShare fontSize={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRoomButton;
