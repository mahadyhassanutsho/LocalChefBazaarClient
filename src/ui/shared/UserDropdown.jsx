import { Link } from "react-router";

import Logout from "../auth/Logout";

const UserDropdown = ({ user }) => {
  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex="1"
        role="button"
        className="btn btn-ghost btn-circle avatar border-3 border-transparent hover:border-accent transition-colors duration-500 ease-in-out"
      >
        <div className="w-10 rounded-full">
          <img src={user.photoURL} />
        </div>
      </button>
      <ul
        tabIndex="1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-2 shadow-md gap-2"
      >
        <Link to="/dashboard/profile" className="btn btn-sm btn-accent">
          Profile
        </Link>
        <Logout className="btn btn-sm btn-accent">Logout</Logout>
      </ul>
    </div>
  );
};

export default UserDropdown;
