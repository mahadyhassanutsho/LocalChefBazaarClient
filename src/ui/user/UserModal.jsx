import {
  FaCalendarAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserShield,
} from "react-icons/fa";

const UserModal = ({ user, onClose }) => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box bg-base-100 max-w-md space-y-4">
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

        {/* Details Section */}
        <div className="space-y-3 text-sm">
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-primary" />
            <span className="font-semibold">Email:</span>
            <span className="opacity-80">{user.email}</span>
          </p>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            <span className="font-semibold">Address:</span>
            <span className="opacity-80">{user.address}</span>
          </p>

          <p className="flex items-center gap-2">
            <FaUserShield className="text-primary" />
            <span className="font-semibold">User ID:</span>
            <span className="opacity-80">{user._id}</span>
          </p>

          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-primary" />
            <span className="font-semibold">Joined:</span>
            <span className="opacity-80">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </p>

          {/* If Chef → Show Chef ID */}
          {user.role === "chef" && (
            <p className="flex items-center gap-2">
              <FaUserShield className="text-primary" />
              <span className="font-semibold">Chef ID:</span>
              <span className="opacity-80">{user.chefId}</span>
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UserModal;
