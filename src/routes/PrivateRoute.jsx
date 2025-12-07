import { useLocation, Navigate } from "react-router";

import useAuth from "../hooks/useAuth";
import Loader from "../ui/shared/Loader";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user)
    return <Navigate to="/login" state={{ redirect: pathname }} replace />;

  return children;
};

export default PrivateRoute;
