import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { loginUser } from "../api"; // Assuming you have an `api` module with a `loginUser` function

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
        firstName: "", // Added first name field
        lastName: "", // Added last name field
    });

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [isRegistration, setIsRegistration] = useState(false); // Track registration mode
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/host";

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    if (isRegistration && loginFormData.password !== confirmPassword) {
      setError(new Error("Password and confirm password don't match"));
      setStatus("idle");
      return;
    }

    loginUser(loginFormData)
      .then((data) => {
        setError(null);
        localStorage.setItem("loggedin", true);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function toggleRegistrationMode() {
    setIsRegistration((prevMode) => !prevMode);
    setLoginFormData({ email: "", password: "" });
    setConfirmPassword("");
    setError(null);
  };

  return (
    <div className="login-container">
      {location.state?.message && (
        <h3 className="login-error">{location.state.message}</h3>
      )}
      <h1>{isRegistration ? 'Create Account' : 'Sign in to your account'}</h1>
      {error?.message && <h3 className="login-error">{error.message}</h3>}
      <form onSubmit={handleSubmit} className="login-form">
      {isRegistration && (
          <>
            <input
              name="firstName"
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              value={loginFormData.firstName}
            />
            <input
              name="lastName"
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              value={loginFormData.lastName}
            />
          </>
        )}
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        {isRegistration && (
          <input
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
          />
        )}
        <button disabled={status === "submitting"}>
          {status === "submitting"
            ? "Submitting..."
            : isRegistration
            ? "Create Account"
            : "Log in"}
        </button>
      </form>
      <p>
        {isRegistration
          ? "Already have an account?"
          : "Don’t have an account?"}{" "}
        <button className="create-account" onClick={toggleRegistrationMode}>
          <strong>{isRegistration ? "Log in now." : "Create one now."}</strong>
        </button>
      </p>
    </div>
  );
}