import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

// Routes
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const RoleBasedRoute = lazy(() => import("./RoleBasedRoute"));
// Layouts
const DefaultLayout = lazy(() => import("../layouts/DefaultLayout"));
const RootLayout = lazy(() => import("../layouts/RootLayout"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
// Pages
const HomePage = lazy(() => import("../pages/public/HomePage"));
const MealsPage = lazy(() => import("../pages/public/MealsPage"));
// Private
const ProfilePage = lazy(() => import("../pages/private/ProfilePage"));
const OrderPage = lazy(() => import("../pages/private/OrderPage"));
const PaymentSuccessPage = lazy(() =>
  import("../pages/private/PaymentSuccessPage")
);
const MealDetailsPage = lazy(() => import("../pages/private/MealDetailsPage"));
// Auth
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
// Admin
const UsersPage = lazy(() => import("../pages/admin/UsersPage"));
const RolesPage = lazy(() => import("../pages/admin/RolesPage"));
const StatsPage = lazy(() => import("../pages/admin/StatsPage"));
// Chef
const NewMealPage = lazy(() => import("../pages/chef/NewMealPage"));
const ManageMealsPage = lazy(() => import("../pages/chef/MealsPage"));
// User
const ReviewsPage = lazy(() => import("../pages/user/ReviewsPage"));
const FavoritesPage = lazy(() => import("../pages/user/FavoritesPage"));
// Error
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

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
          { path: "meals", element: <MealsPage /> },
          {
            path: "meals/:id",
            element: (
              <PrivateRoute>
                <MealDetailsPage />
              </PrivateRoute>
            ),
          },
          {
            path: "order/payment-success",
            element: (
              <PrivateRoute>
                <PaymentSuccessPage />
              </PrivateRoute>
            ),
          },
          {
            path: "order/:id",
            element: (
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            ),
          },
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
              { path: "stats", element: <StatsPage /> },
            ],
          },
          {
            path: "chef/",
            element: <RoleBasedRoute role="chef" />,
            children: [
              { path: "new-meal", element: <NewMealPage /> },
              { path: "meals", element: <ManageMealsPage /> },
            ],
          },
          {
            path: "user/",
            element: <RoleBasedRoute role="user" />,
            children: [
              { path: "reviews", element: <ReviewsPage /> },
              { path: "favorites", element: <FavoritesPage /> },
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
