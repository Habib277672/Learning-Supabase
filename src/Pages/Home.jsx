import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Home = ({ token, googleAuth }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="flex w-full justify-between">
      <div className="m-5 w-full">
        {token || googleAuth ? (
          <div className="flex w-full justify-between">
            <h1 className="text-3xl font-bold text-neutral-900">Welcome</h1>
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded bg-neutral-800 px-4 py-2 text-xl font-bold text-white transition duration-300 hover:scale-[1.02] hover:bg-neutral-700 active:scale-95"
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-neutral-900">
              This is Our Home Page
            </h1>

            <p className="font-semibold text-neutral-700">
              Go To Sign Up Page To Create An Account
            </p>
          </>
        )}
      </div>

      {!token && (
        <NavLink to="/signup" className="flex-end w-50">
          <button className="m-6 cursor-pointer rounded bg-neutral-800 px-4 py-2 text-xl font-bold text-white transition duration-300 hover:scale-[1.02] hover:bg-neutral-700 active:scale-95">
            Sign Up
          </button>
        </NavLink>
      )}
    </div>
  );
};
