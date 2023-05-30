import smilyFace from "../../assets/undraw_smiley-face.svg";
import arrow from "../../assets/undraw_arrow.svg";
import envelope from "../../assets/undraw_envelope.svg";
import AddFriendButton from "../SideBar/AddFriendButton";
const InviteFriends = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-5">
      <h2 className="mb-10 text-6xl">Invite Friends To Get Started</h2>
      <div className="flex items-center justify-between gap-5">
        <img src={smilyFace} className="h-32 image-full" />
        <img src={arrow} className="h-20 " />
        <AddFriendButton className="text-white cursor-pointer text-9xl" />
      </div>
    </div>
  );
};

export default InviteFriends;
