import { Outlet } from "react-router";
import { MdMenu } from "react-icons/md";

import Logo from "../ui/shared/Logo";
import Sidebar from "../ui/layouts/Sidebar";
import Footer from "../ui/layouts/Footer";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open gap-2">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-screen flex flex-col justify-between space-y-2">
        <nav className="navbar w-full bg-base-200 rounded-box p-2 gap-2">
          <label
            htmlFor="drawer"
            aria-label="Open Sidebar"
            className="btn btn-square btn-ghost"
          >
            <MdMenu className="text-2xl" />
          </label>
          <Logo />
        </nav>
        <div className="p-6 md:p-12 bg-base-200 rounded-box flex-1 w-full">
          <Outlet />
        </div>
        <Footer />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible h-full">
        <label
          htmlFor="drawer"
          aria-label="Close Drawer"
          className="drawer-overlay"
        ></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
