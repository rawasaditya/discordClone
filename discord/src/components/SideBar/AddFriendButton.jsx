import { useRef } from "react";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/friendsActions.js";
import style from "./SideBar.module.css";
import { BsPersonFillAdd } from "react-icons/bs";

const AddFriendButton = ({ sendFriendInvitation, className }) => {
  const email = useRef();
  const modalRef = useRef();

  const inviteForm = async (e) => {
    e.preventDefault();
    const bool = await sendFriendInvitation({ email: email.current.value });
    if (bool) {
      modalRef.current.checked = false;
      email.current.value = "";
    }
  };
  return (
    <>
      <label className={className} htmlFor="dc_addFriends_modal">
        <BsPersonFillAdd />
      </label>

      <input
        type="checkbox"
        id="dc_addFriends_modal"
        className="modal-toggle"
        ref={modalRef}
      />
      <label
        htmlFor="dc_addFriends_modal"
        className="cursor-pointer modal modal-bottom sm:modal-middle"
      >
        <label className="relative bg-white modal-box" htmlFor="">
          <h3 className="text-lg font-semibold text-black uppercase">
            Invite a friend
          </h3>
          <form className="py-4" onSubmit={inviteForm}>
            Enter e-mail address of friend which you would like to invite
            <input
              type="email"
              ref={email}
              required
              placeholder="EMAIL"
              className="w-full mt-4 bg-white rounded-none input-sm input input-bordered border-slate-400"
            />
            <button
              type="submit"
              className="w-full mt-4 rounded-none btn btn-sm"
            >
              Invite
            </button>
          </form>
        </label>
      </label>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(AddFriendButton);
