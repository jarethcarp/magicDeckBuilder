import React from "react";
import { useState } from "react";

const RegisterForm = ({ onRegister }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  return (
    <>
      <form
      className="flex flex-col items-center justify-center"
      onSubmit={(e) => {
        console.log("Above onRegister")
        onRegister(e, {
            email: emailValue,
            password: passwordValue,
            confirmPassword: confirmPassword
            // confirmPassword: confirmPassword,
          });
          console.log('RegisterForm test')
        }}
      >
        <div className="flex flex-col items-center justify-center my-3">
          <label htmlFor="email">Email: </label>
          <input
            name="newEmail"
            id="email"
            type="email"
            required
            onChange={(e) => setEmailValue(e.target.value)}
            className="loginFormInput"
          />
        </div>
        <div className="flex flex-col items-center justify-center my-3">
          <label htmlFor="newPassword">Password: </label>
          <input
            name="password"
            id="password"
            type="password"
            required
            onChange={(e) => setPasswordValue(e.target.value)}
            className="loginFormInput"
          />
        </div>
        <div className="flex flex-col items-center justify-center my-3">
          <label htmlFor="ConfirmPassword">Confirm Password: </label>
          <input
            name="password"
            id="password"
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="loginFormInput bg-primary"
          />
        </div>
      <button type="submit" className="navButton mx-3 hover:bg-slate-400 hover:text-primary-dark bg-slate-300 shadow-md">
        Submit
      </button>
      </form>
    </>
  );
};

export default RegisterForm;
