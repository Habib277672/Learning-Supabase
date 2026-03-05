import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { NavLink, useNavigate } from "react-router-dom";

export const SignIn = ({ setToken }) => {
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

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="mx-auto flex h-screen w-full flex-col items-center justify-center rounded">
        <form
          onSubmit={handlFormSubmit}
          className="flex h-64 w-100 flex-col gap-4 rounded-2xl border-2 border-neutral-300 p-5 shadow-md"
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
        <p className="text-md mt-2">
          Already have an Account?{" "}
          <NavLink
            className="text-blue-900 underline transition duration-300 hover:text-neutral-800 hover:no-underline"
            to="/signup"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </section>
  );
};
