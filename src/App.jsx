import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HRDashboard from "./components/HRDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    // ✅ Wrap your entire app with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/hr-dashboard"
            element={
              <ProtectedRoute>
                <HRDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee-dashboard"
            element={
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
