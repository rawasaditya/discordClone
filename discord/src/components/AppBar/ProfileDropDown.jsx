import { logout } from "../../utils/authUtils.js";
import { FiSettings } from "react-icons/fi";
const ProfileDropDown = () => {
  return (
    <div className="dropdown dropdown-right dropdown-end">
      <label
        tabIndex={0}
        className="m-1 text-lg cursor-pointer hover:text-slate-300"
      >
        <FiSettings />
      </label>
      <ul
        tabIndex={0}
        className="p-2 shadow dropdown-content menu bg-base-200 border-slate-300 w-52 menu-compact"
      >
        <li>
          <a>Profile</a>
        </li>
        <li>
          <a onClick={logout}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
