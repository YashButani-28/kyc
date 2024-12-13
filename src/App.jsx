import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Auth/Login.jsx";
import Registration from "./Auth/Registration.jsx";
import Logout from "./Auth/Logout.jsx";
import BasicDetails from "./components/forms/BasicDetails.jsx";
import Layout from "./components/Layout.jsx";
import TermsDetails from "./components/forms/TermsDetails.jsx";
import UserDetails from "./components/forms/UserDetails.jsx";
import AddressDetails from "./components/forms/AddressDetails.jsx";
import ViewDetails from "./components/forms/ViewDetails.jsx";
import NotFound from "./components/forms/NotFound.jsx";
import PrivateRoute from "./route/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/layout",
    element: <Layout />,
    children: [
      {
        path: "basic-details",
        element: (
          <PrivateRoute>
            <BasicDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "terms-datails",
        element: (
          <PrivateRoute>
            <TermsDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "user-details",
        element: (
          <PrivateRoute>
            <UserDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "address-details",
        element: (
          <PrivateRoute>
            <AddressDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "view-details",
        element: (
          <PrivateRoute>
            <ViewDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  return <RouterProvider router={router} />;
}

export default App;
