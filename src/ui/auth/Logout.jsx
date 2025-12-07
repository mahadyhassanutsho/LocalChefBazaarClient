import alert from "../../utils/alert";
import useAuth from "../../hooks/useAuth";

const Logout = ({ children, className }) => {
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    await alert.confirm(
      "Are you sure?",
      "You won't be able to access some feature while logged out",
      async () => {
        try {
          await logoutUser();
          alert.success("Logged In!", "You’ve signed in successfully.");
        } catch (error) {
          alert.error(
            "Oops!",
            error.message || "Something went wrong! Please try again."
          );
        }
      }
    );
  };

  return (
    <button className={className} onClick={handleLogout}>
      {children}
    </button>
  );
};

export default Logout;
