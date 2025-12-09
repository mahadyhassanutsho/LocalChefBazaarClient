import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaCheckCircle,
  FaCircle,
  FaExclamationTriangle,
  FaEye,
  FaTrash,
} from "react-icons/fa";

import alert from "../utils/alert";
import useUser from "../hooks/useUser";
import useAxios from "../hooks/useAxios";
import Loader from "../ui/shared/Loader";
import UserModal from "../ui/user/UserModal";

const UsersPage = () => {
  const { user: loggedInUser } = useUser();
  const axios = useAxios();
  const { data, error, refetch, isError, isLoading } = useQuery({
    queryKey: ["get-all-users"],
    queryFn: () => axios.get("/users").then((res) => res.data),
  });
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewUser = async (id) => {
    setSelectedUser(users.find((user) => user._id === id));
  };

  const handleDelete = async (user) => {
    const { _id: id, displayName } = user;

    await alert.confirm(
      "Are you sure?",
      `You are permanently deleting "${displayName}". This action cannot be undone.`,
      async () => {
        try {
          await axios.delete(`/users/${id}`);
          await refetch();
          alert.success("Deleted!", "User has been deleted.");
        } catch (error) {
          alert.error(
            "Oops!",
            error.message || "Something went wrong! Please try again."
          );
        }
      }
    );
  };

  const handleMarkAsFraud = async (user) => {
    const { _id: id, displayName } = user;

    await alert.confirm(
      "Are you sure",
      `You are about to mark "${displayName}" as a Fraud`,
      async () => {
        try {
          await axios.patch(`/users/${id}`, { status: "fraud" });
          await refetch();
          alert.success("Marked as Fraud!", "User has been marked as a Fraud.");
        } catch (error) {
          alert.error(
            "Oops!",
            error.message || "Something went wrong! Please try again."
          );
        }
      }
    );
  };

  const handleMarkAsActive = async (user) => {
    const { _id: id, displayName } = user;
    await alert.confirm(
      "Are you sure",
      `You are about to mark "${displayName}" as Active`,
      async () => {
        try {
          await axios.patch(`/users/${id}`, { status: "active" });
          await refetch();
          alert.success("Marked as Active!", "User has been marked as Active.");
        } catch (error) {
          alert.error(
            "Oops!",
            error.message || "Something went wrong! Please try again."
          );
        }
      }
    );
  };

  if (isLoading) return <Loader />;

  if (isError) throw new Error(error.message);

  const users = data.filter((user) => user._id !== loggedInUser._id);

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold">Manage Users</h2>

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Head */}
          <thead>
            <tr>
              <th>Index</th>
              <th>Profile</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                {/* Index */}
                <td className="font-bold">{i + 1}</td>
                {/* Profile */}
                <td className="">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-12 h-12">
                        <img src={user.photoURL} alt={user.displayName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{user.displayName}</div>
                      <div className="text-xs opacity-50 max-w-[120px] truncate">
                        {user._id}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="max-w-40 truncate">{user.email}</td>

                {/* Address */}
                <td className="max-w-40 truncate">{user.address}</td>

                {/* Role */}
                <td className="capitalize ">
                  <div className="badge badge-primary">{user.role}</div>
                </td>

                {/* Status */}
                <td className="capitalize ">
                  <div className="flex items-center gap-2">
                    <FaCircle
                      className={
                        user.status === "active" ? "text-success" : "text-error"
                      }
                      size={10}
                    />
                    {user.status}
                  </div>
                </td>

                {/* Joined Date */}
                <td className="">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                {/* Actions Buttons */}
                <td>
                  <div className="flex gap-2 justify-center">
                    {/* View User */}
                    <button
                      className="btn btn-info btn-xs text-white tooltip"
                      data-tip="View User"
                      onClick={() => handleViewUser(user._id)}
                    >
                      <FaEye size={12} />
                    </button>

                    {/* Mark as Fraud */}
                    {user.status === "active" ? (
                      <button
                        className="btn btn-warning btn-xs text-white tooltip"
                        data-tip="Mark as Fraud"
                        disabled={isLoading}
                        onClick={() => handleMarkAsFraud(user)}
                      >
                        <FaExclamationTriangle size={12} />
                      </button>
                    ) : (
                      <button
                        className="btn btn-success btn-xs text-white tooltip"
                        data-tip="Mark as Active"
                        disabled={isLoading}
                        onClick={() => handleMarkAsActive(user)}
                      >
                        <FaCheckCircle size={12} />
                      </button>
                    )}

                    {/* Delete */}
                    <button
                      className="btn btn-error btn-xs text-white tooltip"
                      data-tip="Delete User"
                      onClick={() => handleDelete(user)}
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
