import React from "react";
import { useState } from "react";

const loginForm = ({ onLogin }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <>
      <div className="flex flex-col items-center justify-center my-3">
        <div className="font-bold text-2xl my-3">Login</div>
        <form
          className="flex flex-col items-center justify-center my-3"
          onSubmit={(e) => {
            onLogin(e, {
              email: emailValue,
              password: passwordValue,
            });
          }}
        >
          <div className="flex flex-col items-center justify-center my-3">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              required
              onChange={(e) => setEmailValue(e.target.value)}
              className="loginFormInput"
            />
          </div>
          <div className="flex flex-col items-center justify-center my-3">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              required
              onChange={(e) => setPasswordValue(e.target.value)}
              className="loginFormInput"
            />
          </div>
          <button type="submit" className="navButton mx-3 my-3 text-primary-dark hover:bg-slate-400 hover:text-primary-dark bg-slate-300 shadow-md">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default loginForm;
