import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/Home";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import "./App.css";

const App = () => {
  const [token, setToken] = useState(() => {
    const savedToken = sessionStorage.getItem("token");
    return savedToken ? JSON.parse(savedToken) : false;
  });
  const [googleAuth, setGoogleAuth] = useState(false);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  useEffect(() => {
    if (googleAuth) {
      sessionStorage.setItem("token", JSON.stringify(googleAuth));
    }
  }, [googleAuth]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home token={token} googleAuth={googleAuth} />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn setToken={setToken} setGoogleAuth={setGoogleAuth} />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
