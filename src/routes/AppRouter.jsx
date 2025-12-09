import { createBrowserRouter, RouterProvider } from "react-router";

// Routes
import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute";
// Layouts
import DefaultLayout from "../layouts/DefaultLayout";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
// Pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import UsersPage from "../pages/UsersPage";
import RolesPage from "../pages/RolesPage";
import NewMealPage from "../pages/NewMealPage";
import MealsPage from "../pages/MealsPage";
// Common
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <RootLayout />,
        children: [
          { path: "", element: <HomePage /> },
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
      {
        path: "dashboard/",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { path: "", element: <ProfilePage /> },
          { path: "profile", element: <ProfilePage /> },
          {
            path: "admin/",
            element: <RoleBasedRoute role="admin" />,
            children: [
              { path: "users", element: <UsersPage /> },
              { path: "roles", element: <RolesPage /> },
            ],
          },
          {
            path: "chef/",
            element: <RoleBasedRoute role="chef" />,
            children: [
              { path: "new-meal", element: <NewMealPage /> },
              { path: "meals", element: <MealsPage /> },
              // { path: "orders", element: null },
            ],
          },
        ],
      },
    ],
  },
]);

const AppRouter = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default AppRouter;
