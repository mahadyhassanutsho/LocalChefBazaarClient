import { Outlet } from "react-router";

import Navbar from "../ui/layouts/Navbar";
import Footer from "../ui/layouts/Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="mt-2 mb-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
