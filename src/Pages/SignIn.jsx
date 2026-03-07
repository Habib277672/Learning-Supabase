import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export const SignIn = ({ setToken, setGoogleAuth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlFormSubmit = async (e) => {
    e.preventDefault();

    // Sign In the user with Supabase
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        console.log(error);
      }
      // console.log(data);

      if (data.user.aud === "authenticated") {
        setToken(data);
        navigate("/");
        alert("Congrats You Have Signed In Successfully!");
      }
    } catch (error) {
      alert(error.message);
    }

    // After signing clear the form
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (data) {
      setGoogleAuth(data);
      alert("Congrats You Have Signed In Successfully!");
    } else if (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto flex h-90 w-120 flex-col items-center justify-center rounded-2xl border-2 border-neutral-300 p-5 shadow-md">
        <form
          onSubmit={handlFormSubmit}
          className="flex h-64 w-100 flex-col gap-4"
        >
          <h2 className="text-center text-2xl font-bold">Sign In</h2>

          <input
            className="w-full rounded-lg border border-neutral-500 px-4 py-2 ring-neutral-500 ring-offset-2 transition duration-300 outline-none placeholder:text-neutral-600 focus:border-none focus:ring-2"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            type="email"
            placeholder="Enter your Email"
          />
          <input
            className="w-full rounded-lg border border-neutral-500 px-4 py-2 ring-neutral-500 ring-offset-2 transition duration-300 outline-none placeholder:text-neutral-600 focus:border-none focus:ring-2"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            type="password"
            placeholder="Enter your Password"
          />
          <button
            className="cursor-pointer rounded bg-neutral-800 px-4 py-2 text-xl font-bold text-white transition duration-300 hover:scale-[1.02] hover:bg-neutral-700 active:scale-95"
            type="submit"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <hr className="grow border-gray-300" />
          <span className="mx-2 text-gray-400">--- or ---</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-300 py-3 transition-colors hover:bg-gray-100"
        >
          <FcGoogle size={24} />
          <span className="font-semibold text-gray-700">
            Sign in with Google
          </span>
        </button>
      </div>
      <p className="text-md mt-2">
        Already have an Account?{" "}
        <NavLink
          className="text-blue-900 underline transition duration-300 hover:text-neutral-800 hover:no-underline"
          to="/signup"
        >
          Sign Up
        </NavLink>
      </p>
    </section>
  );
};
