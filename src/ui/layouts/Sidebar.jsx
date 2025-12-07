import { NavLink } from "react-router";
import {
  FaUser,
  FaBox,
  FaStar,
  FaHeart,
  FaPlusCircle,
  FaList,
  FaClipboardList,
  FaUsers,
  FaUserShield,
  FaChartBar,
  FaPowerOff,
} from "react-icons/fa";

import useUser from "../../hooks/useUser";
import Logout from "../../ui/auth/Logout";
import Loader from "../../ui/shared/Loader";

const navLinks = {
  user: [
    { path: "orders", name: "Orders", icon: FaBox },
    { path: "reviews", name: "Reviews", icon: FaStar },
    { path: "favorites", name: "Favorite Meals", icon: FaHeart },
  ],
  chef: [
    { path: "create-meal", name: "Create Meal", icon: FaPlusCircle },
    { path: "my-meals", name: "My Meals", icon: FaList },
    { path: "order-requests", name: "Order Requests", icon: FaClipboardList },
  ],
  admin: [
    { path: "users", name: "Users", icon: FaUsers },
    { path: "roles", name: "Roles", icon: FaUserShield },
    { path: "stats", name: "Stats", icon: FaChartBar },
  ],
};

const Sidebar = () => {
  const { user, error, isError, isLoading } = useUser();

  if (isLoading) return <Loader />;

  if (isError) throw new Error(error.message);

  return (
    <div className="py-2 min-h-full flex flex-col items-start bg-base-200 is-drawer-close:w-fit is-drawer-open:w-64 rounded-r-box">
      <ul className="menu w-full grow items-center gap-2">
        <li className="w-full">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `is-drawer-close:tooltip is-drawer-close:tooltip-right items-center ${
                isActive ? "bg-accent/50" : "bg-inherit"
              }`
            }
            data-tip="Homepage"
          >
            <FaUser className="text-xl" />
            <span className="is-drawer-close:hidden font-bold">Profile</span>
          </NavLink>
        </li>

        {navLinks[user.role].map((link, i) => {
          const Icon = link.icon;
          return (
            <li key={i} className="w-full">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right items-center ${
                    isActive ? "bg-accent/50" : "bg-inherit"
                  } hover:bg-accent/25`
                }
                data-tip={link.name}
              >
                <Icon className="text-xl" />
                <span className="is-drawer-close:hidden font-bold">
                  {link.name}
                </span>
              </NavLink>
            </li>
          );
        })}

        <li className="w-full">
          <Logout className="btn btn-sm btn-warning">
            <div
              className="is-drawer-close:tooltip is-drawer-close:tooltip-bottom"
              data-tip="Logout"
            >
              <FaPowerOff className="text-xl" />

              <span className="is-drawer-close:hidden font-bold">Logout</span>
            </div>
          </Logout>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
