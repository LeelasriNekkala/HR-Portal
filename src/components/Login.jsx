import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      authService.login({ username, password, role });
      const user = authService.getAuth();
      if (user.role === "hr") navigate("/hr-dashboard");
      else navigate("/employee-dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card p-3 shadow-lg"
        style={{
          width: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: "15px",
        }}
      >
        <h3 className="text-center mb-3 fw-bold">Login</h3>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary fw-semibold">
              Login
            </button>
          </div>
        </form>

        <p className="text-center mb-0">
          <Link to="/signup" className="text-primary">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
