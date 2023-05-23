import { logout } from "../../utils/authUtils.js";
const ProfileDropDown = () => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="m-1 ">
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
            <img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurly&accessoriesType=Blank&hairColor=SilverGray&facialHairType=BeardLight&facialHairColor=BlondeGolden&clotheType=ShirtVNeck&clotheColor=Gray01&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=Smile&skinColor=Light'" />
          </div>
        </div>
      </label>
      <ul
        tabIndex={0}
        className="p-2 border shadow dropdown-content menu bg-base-200 border-slate-300 w-52 menu-compact"
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
