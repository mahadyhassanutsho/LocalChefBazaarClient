import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaCircle, FaEye, FaTrash } from "react-icons/fa";

import alert from "../../utils/alert";
import useAxios from "../../hooks/useAxios";
import Loader from "../../ui/shared/Loader";
import UserModal from "../../ui/user/UserModal";

const RolesPage = () => {
  const axios = useAxios();
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: requests,
    error,
    refetch,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["get-all-requests"],
    queryFn: () => axios.get("/requests").then((res) => res.data),
  });

  if (isLoading) return <Loader />;
  if (isError) throw new Error(error.message);

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleApprove = async (request) => {
    await alert.confirm(
      "Approve Request?",
      `Give "${request.user.displayName}" the "${request.role}" role?`,
      async () => {
        try {
          await axios.patch(`/requests/${request._id}`, {
            status: "approved",
          });

          await axios.patch(`/users/${request.user._id}`, {
            role: request.role,
          });

          await refetch();
          alert.success("Approved!", "Role has been assigned.");
        } catch (error) {
          alert.error("Oops!", error.message);
        }
      }
    );
  };

  const handleDelete = async (id) => {
    await alert.confirm(
      "Delete Request?",
      "This action cannot be undone.",
      async () => {
        try {
          await axios.delete(`/requests/${id}`);
          await refetch();
          alert.success("Deleted!", "Request removed.");
        } catch (error) {
          alert.error("Oops!", error.message);
        }
      }
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold">Manage Role Requests</h2>

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Index</th>
              <th>Display Name</th>
              <th>Requested Role</th>
              <th>Status</th>
              <th>Requested At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req, i) => (
              <tr key={req._id}>
                {/* Index */}
                <td className="font-bold">{i + 1}</td>

                {/* Display Name */}
                <td className="font-semibold">{req.user.displayName}</td>

                {/* Requested Role */}
                <td className="capitalize">
                  <div className="badge badge-primary">{req.role}</div>
                </td>

                {/* Status */}
                <td className="capitalize">
                  <div className="flex items-center gap-2">
                    <FaCircle
                      className={
                        req.status === "approved"
                          ? "text-success"
                          : "text-warning"
                      }
                      size={10}
                    />
                    {req.status}
                  </div>
                </td>

                {/* Created Date */}
                <td>{new Date(req.createdAt).toLocaleString()}</td>

                {/* ACTIONS */}
                <td>
                  <div className="flex gap-2 justify-center">
                    {/* View User */}
                    <button
                      className="btn btn-info btn-xs tooltip"
                      data-tip="View User"
                      onClick={() => handleViewUser(req.user)}
                    >
                      <FaEye size={12} />
                    </button>

                    {/* Approve */}
                    {req.status === "pending" && (
                      <button
                        className="btn btn-success btn-xs tooltip"
                        data-tip="Approve Request"
                        onClick={() => handleApprove(req)}
                      >
                        <FaCheckCircle size={12} />
                      </button>
                    )}

                    {/* Delete */}
                    <button
                      className="btn btn-error btn-xs tooltip"
                      data-tip="Delete Request"
                      onClick={() => handleDelete(req._id)}
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

export default RolesPage;
