import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const user = authService.getAuth() || {
    username: "User",
    id: 0,
    role: "Employee",
  };

  const [leaveReason, setLeaveReason] = useState("");
  const [leaveDays, setLeaveDays] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);

  //  Logout
  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  // View personal & attendance details
  const handleViewDetails = () => {
    setShowProfileModal(true);
  };

  // Fetch employee's leave status
  const handleViewLeaveStatus = async () => {
    try {
      const res = await fetch("http://localhost:5000/leaves");
      const data = await res.json();

      // Filter only this employee's leaves
      const employeeLeaves = data.filter(
        (leave) => String(leave.employeeId) === String(user.id)
      );

      setLeaveData(employeeLeaves);
      setShowLeaveModal(true);
    } catch (error) {
      console.error("Error fetching leave data:", error);
      alert("Error fetching leave data. Please check your JSON server.");
    }
  };

  // Apply Leave and Save to JSON Server
  const handleApplyLeave = async (e) => {
    e.preventDefault();
    if (!leaveReason.trim() || !leaveDays.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newLeave = {
      id: Date.now().toString(),
      employeeId: String(user.id),
      reason: leaveReason,
      days: parseInt(leaveDays),
      status: "Pending",
    };

    try {
      const res = await fetch("http://localhost:5000/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeave),
      });

      if (res.ok) {
        alert("Leave applied successfully!");
        setLeaveReason("");
        setLeaveDays("");
      } else {
        alert("Failed to submit leave. Try again.");
      }
    } catch (error) {
      console.error("Error submitting leave:", error);
      alert("Error submitting leave. Check JSON Server.");
    }
  };

  return (
    <div
      className="container-fluid py-5 position-relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Logout Button */}
      <div className="text-end me-5">
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>

      {/* Title */}
      <h2 className="text-center mb-5 fw-bold text-warning">
        Employee Dashboard
      </h2>

      {/* Cards Section */}
      <div className="row justify-content-center g-4">
        {/* Welcome Card */}
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm bg-light bg-opacity-75">
            <div className="card-body">
              <p className="card-text fw-bold text-dark">Welcome</p>
              <h5 className="card-title mb-3 text-dark">{user.username}</h5>
              <button className="btn btn-primary" onClick={handleViewDetails}>
                View Details
              </button>
            </div>
          </div>
        </div>

        {/*  View Leave Status */}
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm bg-light bg-opacity-75">
            <div className="card-body">
              <p className="card-text fw-bold text-dark">
                {user.username}, view your leave details!
              </p>
              <button
                className="btn btn-primary"
                onClick={handleViewLeaveStatus}
              >
                View Leave Status
              </button>
            </div>
          </div>
        </div>

        {/* Apply Leave */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm bg-light bg-opacity-75">
            <div className="card-body">
              <h5 className="card-title text-center text-dark">
                Apply for Leave
              </h5>
              <form onSubmit={handleApplyLeave} className="text-center">
                <div className="mb-3">
                  <label
                    htmlFor="leaveDays"
                    className="form-label text-dark fw-bold"
                  >
                    Number of Days
                  </label>
                  <input
                    type="number"
                    id="leaveDays"
                    className="form-control mx-auto"
                    style={{ width: "90%" }}
                    value={leaveDays}
                    onChange={(e) => setLeaveDays(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="leaveReason"
                    className="form-label text-dark fw-bold"
                  >
                    Reason for Leave
                  </label>
                  <textarea
                    id="leaveReason"
                    className="form-control mx-auto"
                    style={{ width: "90%" }}
                    rows="3"
                    placeholder="Enter your reason..."
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary px-4">
                  Apply Leave
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Status Modal */}
      {showLeaveModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Leave Status</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLeaveModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {leaveData.length > 0 ? (
                  <ul className="list-group">
                    {leaveData.map((leave) => (
                      <li
                        key={leave.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>Days:</strong> {leave.days} <br />
                          <small className="text-muted">
                            Reason: {leave.reason}
                          </small>
                        </div>
                        <span
                          className={`badge ${
                            leave.status === "Approved"
                              ? "bg-success"
                              : leave.status === "Rejected"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {leave.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-muted mb-0">
                    No leave records found.
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowLeaveModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Profile Modal */}
      {showProfileModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Employee Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProfileModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <h6 className="fw-bold">Personal Information</h6>
                <ul className="list-group mb-3">
                  <li className="list-group-item">
                    <strong>Name:</strong> {user.username}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {user.email || "leela@gmail.com"}
                  </li>
                  <li className="list-group-item">
                    <strong>Department:</strong> {user.department || "Employee"}
                  </li>
                  <li className="list-group-item">
                    <strong>Role:</strong> {user.role}
                  </li>
                </ul>

                <h6 className="fw-bold">Attendance Summary</h6>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Total Working Days:</strong> 30
                  </li>
                  <li className="list-group-item">
                    <strong>Present Days:</strong> 26
                  </li>
                  <li className="list-group-item">
                    <strong>Leave Taken:</strong> 4
                  </li>
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowProfileModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;
