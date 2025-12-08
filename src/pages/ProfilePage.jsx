import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserShield,
} from "react-icons/fa";

import alert from "../utils/alert";
import useUser from "../hooks/useUser";
import useAxios from "../hooks/useAxios";
import Loader from "../ui/shared/Loader";

const ProfilePage = () => {
  const axios = useAxios();
  const { user, error, isError, isLoading } = useUser();

  const requestRole = async (role) => {
    try {
      await axios
        .post("/requests", { user: user._id, role })
        .then((res) => res.data);
      alert.success(
        "Role Request Received!",
        "Your role request has been sent. The Admin Panel will review it shortly."
      );
    } catch (error) {
      alert.error(
        "Oops!",
        error.message || "Something went wrong! Please try again."
      );
    }
  };

  if (isLoading) return <Loader />;

  if (isError) throw new Error(error.message);

  return (
    <div className="p-6 bg-base-200">
      <div className="max-w-2xl mx-auto">
        {/* Image, Role and Status */}
        <div className="relative flex flex-col items-center">
          <span className="absolute top-0 right-0 badge badge-primary shadow-md capitalize">
            {user.role}
          </span>

          <div className="relative">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="rounded-full w-40 h-40 object-cover border-4 border-primary shadow-lg"
            />

            <div
              className="absolute bottom-3 right-3 tooltip tooltip-right cursor-pointer"
              data-tip={user.status}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 border-base-100 ${
                  user.status === "active" ? "bg-success" : "bg-error"
                }`}
              ></div>
            </div>
          </div>

          <h1 className="text-3xl font-bold mt-4">{user.displayName}</h1>
        </div>

        <div className="divider" />

        <div className="flex flex-col gap-4">
          {/* Status */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`w-4 h-4 rounded-full ${
                  user.status === "active" ? "bg-success" : "bg-error"
                }`}
              ></span>
              <span className="font-semibold">Status:</span>
            </div>
            <span className="capitalize ml-6">{user.status}</span>
          </div>

          {/* Role */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FaUserShield className="text-primary w-4" />
              <span className="font-semibold">Role:</span>
            </div>
            <span className="capitalize ml-6">{user.role}</span>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-primary w-4" />
              <span className="font-semibold">Email:</span>
            </div>
            <span className="ml-6">{user.email}</span>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary w-4" />
              <span className="font-semibold">Address:</span>
            </div>
            <span className="ml-6">{user.address}</span>
          </div>

          {/* Chef ID — only if user.role === "chef" */}
          {user.role === "chef" && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FaUserShield className="text-primary w-4" />
                <span className="font-semibold">Chef ID:</span>
              </div>
              <span className="ml-6">{user._id}</span>
            </div>
          )}

          {/* Joined */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-primary w-4" />
              <span className="font-semibold">Joined:</span>
            </div>
            <span className="ml-6">
              {new Date(user.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="divider" />

        <div className="mx-auto w-full max-w-64 flex items-center justify-center gap-2">
          <button
            className={`${
              user.role === "user" ? "w-1/2 btn btn-primary" : "hidden"
            }`}
            onClick={() => requestRole("chef")}
          >
            Be a Chef
          </button>
          <button
            className={`${
              user.role === "admin" ? "hidden" : "w-1/2 btn btn-primary"
            }`}
            onClick={() => requestRole("admin")}
          >
            Be an Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
