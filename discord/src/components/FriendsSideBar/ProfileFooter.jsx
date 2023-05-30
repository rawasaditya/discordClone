import { connect } from "react-redux";
import ProfileDropDown from "../AppBar/ProfileDropDown";
const ProfileFooter = ({ userDetails }) => {
  return (
    <div className="flex items-center w-full gap-2 px-3 py-3 bg-slate-900">
      <div className="flex items-center flex-1 gap-2">
        <div className={`avatar online} placeholder `}>
          <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
            <span className="text-sm">{`${
              userDetails?.firstName ? userDetails?.firstName.at(0) : ""
            } 
          ${userDetails?.lastName ? userDetails?.lastName.at(0) : ""}
          `}</span>
          </div>
        </div>
        <span>
          {`${userDetails?.firstName}`} {`${userDetails?.lastName}`}
        </span>
      </div>
      <ProfileDropDown />
    </div>
  );
};

const mapStoreStateToProps = ({ authReducer }) => {
  return authReducer;
};

export default connect(mapStoreStateToProps)(ProfileFooter);
