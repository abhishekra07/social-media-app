import {
  createBrowserRouter,
  Outlet,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";

import NavBar from "./components/navbar/NavBar";
import LeftBar from "./components/leftbar/LeftBar";
import RightBar from "./components/rightbar/RightBar";

import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/authContextProvider";

function App() {
  const { currentUser } = useContext(AuthContext);

  const Layout = () => {
    return (
      <div>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
