import React, { useState } from "react";
import './Login.css'

export default function Login() {

  // State to manage login form data
  const [loginFormData, setLoginFormData] = useState({
      email: '',
      password: '',
      firstName: '', 
      lastName: '',
  });

  // State for managing form submission status
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  // State to manage registration mode
  const [isRegistration, setIsRegistration] = useState(false);
  
  // State to manage confirmPassword input field for registration
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    setStatus("Submitting");
  }
  
  // Handle form input field changes
  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  
  // Toggle between login and registration modes
  function toggleRegistrationMode() {
    setIsRegistration((prevMode) => !prevMode);
    setLoginFormData({ email: '', password: '' });
    setConfirmPassword('');
    setError(null);
  };

return (
  <div className="login-container">
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