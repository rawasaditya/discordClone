import { MdOutlineCheck, MdClose } from "react-icons/md";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/friendsActions.js";
import { acceptFriendInvitation, rejectFriendInvitation } from "../../api.js";
import store from "../../store/store.js";
import { setPendingFriendsInvitation } from "../../store/actions/friendsActions";
import { toast } from "react-toastify";

const PendingInvitationItem = ({ id, firstName, lastName, email }) => {
  const accept = () => {
    const resp = acceptFriendInvitation({ invitationID: id });
    resp.then((data) => {
      toast.success(`You are not friends with ${firstName}`);
      store.dispatch(setPendingFriendsInvitation(data.data));
    });
  };
  const reject = () => {
    const resp = rejectFriendInvitation({ invitationID: id });
    resp.then((data) => {
      toast.info(`Invitation rejected..!`);
      store.dispatch(setPendingFriendsInvitation(data.data));
    });
  };
  return (
    <div
      className="w-full text-left tooltip tooltip-accent tooltip-bottom"
      data-tip={email}
    >
      <span className="flex items-center justify-start w-full gap-2 p-1 px-0 mt-1 mb-2 align-middle bg-transparent border-0 rounded-none outline-non2 hover:bg-opacity-30 ">
        <div className={`avatar placeholder `}>
          <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
            <span className="text-sm">{`${firstName ? firstName.at(0) : ""} 
      ${lastName ? lastName.at(0) : ""}
      `}</span>
          </div>
        </div>
        <span className="flex-grow">{`${firstName}`}</span>
        <span className="flex gap-3 px-4">
          <button
            className="h-auto p-0 bg-transparent border-none btn hover:bg-transparent"
            onClick={accept}
          >
            <MdOutlineCheck color="#BADA55" />
          </button>
          <button
            className="h-auto p-0 bg-transparent border-none btn hover:bg-transparent"
            onClick={reject}
          >
            <MdClose color="#ed4245" />
          </button>
        </span>
      </span>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(PendingInvitationItem);
