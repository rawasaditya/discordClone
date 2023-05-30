import { chatTypes } from "../../store/actions/chatActions.js";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/chatActions.js";
const FriendsListsItem = ({
  id,
  firstName,
  lastName,
  isOnline,
  setChosenChatDetails,
}) => {
  const handleChooseActiveConversation = () => {
    setChosenChatDetails(
      { id: id, firstName: firstName, lastName: lastName },
      chatTypes.DIRECT
    );
  };

  return (
    <button
      onClick={handleChooseActiveConversation}
      className="flex items-center justify-start w-full gap-2 px-0 mt-1 mb-2 align-middle bg-transparent border-0 rounded-none outline-none btn hover:bg-opacity-30"
    >
      <div className={`avatar ${isOnline ? "online" : ""} placeholder `}>
        <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
          <span className="text-sm">{`${firstName ? firstName.at(0) : ""} 
          ${lastName ? lastName.at(0) : ""}
          `}</span>
        </div>
      </div>
      <span>{`${firstName}`}</span>
    </button>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(FriendsListsItem);
