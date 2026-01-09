import { Link, NavLink } from "react-router";
import { MdMenu } from "react-icons/md";

import useAuth from "../../hooks/useAuth";
import Logo from "../shared/Logo";
import UserDropdown from "../shared/UserDropdown";
import ThemeToggle from "../shared/ThemeToggle";

const privateLinks = [
  { path: "/", label: "Home" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/meals", label: "Meals" },
];

const publicLinks = [
  { path: "/", label: "Home" },
  { path: "/meals", label: "Meals" },
];

const Navbar = () => {
  const { user } = useAuth();

  const navLinks = (user ? privateLinks : publicLinks).map((link, index) => (
    <li key={index}>
      <NavLink
        to={link.path}
        className={({ isActive }) =>
          `px-4 font-semibold ${
            isActive ? "bg-accent/50" : "bg-inherit"
          } rounded-full hover:bg-accent/30`
        }
      >
        {link.label}
      </NavLink>
    </li>
  ));

  return (
    <div className="sticky top-0 z-50 bg-base-100 navbar px-0 md:px-4 rounded-b-box hover:shadow-xs transition-shadow">
      <div className="navbar-start gap-1">
        <div className="dropdown">
          <div
            tabIndex="0"
            role="button"
            className="btn btn-ghost p-2 md:hidden"
          >
            <MdMenu className="text-2xl" />
          </div>
          <ul
            tabIndex="0"
            className="menu gap-1 dropdown-content bg-base-100 rounded-box mt-4 w-52 p-2 z-1 shadow-md"
          >
            {navLinks}
          </ul>
        </div>

        <Logo />
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="w-fit flex items-center gap-2">
            <ThemeToggle />
            <UserDropdown user={user} />
          </div>
        ) : (
          <div className="w-fit flex items-center gap-2">
            <ThemeToggle />
            <Link to="/login" className="btn btn-primary btn-outline font-bold">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
