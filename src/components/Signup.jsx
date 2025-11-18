import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import authService from "../services/authService";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    try {
      authService.signup({ username, password, role });
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} />

      <div
        className="card p-4 shadow-lg text-center"
        style={{
          width: "450px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "15px",
        }}
      >
        <h3 className="fw-bold mb-3">Sign Up</h3>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Role selection */}
          <div className="d-flex justify-content-center gap-4">
            <div className="form-check">
              <input
                type="radio"
                id="employee"
                name="role"
                value="employee"
                checked={role === "employee"}
                onChange={(e) => setRole(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="employee" className="form-check-label">
                Employee
              </label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                id="hr"
                name="role"
                value="hr"
                checked={role === "hr"}
                onChange={(e) => setRole(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="hr" className="form-check-label">
                HR
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary fw-semibold">
              Create Account
            </button>
          </div>
        </form>

        <p>
          <Link to="/" className="text-primary fw-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
