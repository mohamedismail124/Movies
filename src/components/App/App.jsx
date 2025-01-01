/* eslint-disable no-unused-vars */

import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MasterLayout from "../MasterLayout/MasterLayout";
import Home from "./../Home/Home";
import About from "./../About/About";
import Movies from "./../Movies/Movies";
import Tvshows from "./../Tvshows/Tvshows";
import Register from "./../Register/Register";
import Login from "./../Login/Login";
import People from "./../People/people";
import Notfound from "./../Notfound/Notfound";
import { useContext } from "react";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../protectedRoute/protectedRoute";
import Details from "./../Details/Details";
import { AuthContext } from "../../Context/AuthStore";
import { Offline, Online } from "react-detect-offline";

function App() {
  const { userData, saveUserData, logout } = useContext(AuthContext);

  let routes = createHashRouter([
    {
      path: "/",
      element: <MasterLayout userData={userData} logout={logout} />,
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute userData={userData}>
              <Home />
            </ProtectedRoute>
          )
        },
        {
          path: "movies",
          element: (
            <ProtectedRoute userData={userData}>
              <Movies />
            </ProtectedRoute>
          )
        },
        {
          path: "tvshows",
          element: (
            <ProtectedRoute userData={userData}>
              <Tvshows />
            </ProtectedRoute>
          )
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute userData={userData}>
              <Profile userData={userData} />
            </ProtectedRoute>
          )
        },
        {
          path: "people",
          element: (
            <ProtectedRoute userData={userData}>
              <People />
            </ProtectedRoute>
          )
        },
        {
          path: "details/:id/:mediaType",
          element: (
            <ProtectedRoute userData={userData}>
              <Details />
            </ProtectedRoute>
          )
        },
        { path: "about", element: <About /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> }
      ]
    }
  ]);

  return (
    <>
      <div>
        <Online>
          <RouterProvider router={routes} />
        </Online>
        <Offline><h1 className="text-center">you are offline</h1></Offline>
      </div>
    </>
  );
}

export default App;
