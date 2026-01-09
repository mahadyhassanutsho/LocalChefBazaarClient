import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <div className="bg-base-100 text-base-content w-full">
      <div className="max-w-7xl mx-auto p-2 pb-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
