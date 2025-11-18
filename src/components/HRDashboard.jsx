import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEmployees,
  getLeaves,
  updateLeaveStatus,
  addEmployee,
} from "../services/apiService";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HRDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = authService.getAuth();

  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    department: "",
  });

  // ✅ Fetch Employees
  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  // ✅ Fetch Leaves
  const { data: leaves } = useQuery({
    queryKey: ["leaves"],
    queryFn: getLeaves,
  });

  // ✅ Logout
  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  // ✅ Update leave status (Approve / Reject)
  const handleStatusChange = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      if (status === "Approved") {
        toast.success(`Leave ${status} successfully ✅`, { theme: "colored" });
      } else {
        toast.error(`Leave ${status} ❌`, { theme: "colored" });
      }
      queryClient.invalidateQueries(["leaves"]);
    } catch (err) {
      toast.error("Error updating leave status", { theme: "colored" });
    }
  };

  // ✅ Add new employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const employeeWithId = {
        ...newEmployee,
        id: Date.now().toString(), // ✅ Add unique ID here
      };
      await addEmployee(employeeWithId); // send object with id
      toast.success("Employee added successfully 🎉", { theme: "colored" });
      queryClient.invalidateQueries(["employees"]);
      setShowModal(false);
      setNewEmployee({ name: "", email: "", department: "" });
    } catch (err) {
      toast.error("Failed to add employee", { theme: "colored" });
    }
  };

  if (isLoading) return <p className="text-center mt-5">Loading data...</p>;
  if (isError)
    return <p className="text-center mt-5 text-danger">Error fetching data!</p>;

  // ✅ Fix Unknown Employee issue
  const getEmployeeName = (empId) => {
    if (!employees || !empId) return "Unknown Employee";
    const emp = employees.find((e) => String(e.id) === String(empId));
    return emp ? `${emp.name} (${emp.department})` : "Unknown Employee";
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
        url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      {/* Logout */}
      <div className="text-end me-5">
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>

      <h2 className="text-center fw-bold mb-4 text-warning">HR Dashboard</h2>

      {/* Add Employee */}
      <div className="d-flex justify-content-center mb-5">
        <div
          className="card shadow-lg p-4 text-center bg-light bg-opacity-75"
          style={{ width: "300px" }}
        >
          <h5 className="fw-bold text-dark">Add New Employee</h5>
          <button
            className="btn btn-primary mt-3"
            onClick={() => setShowModal(true)}
          >
            Add Employee
          </button>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="container mt-5">
        <h4 className="fw-bold text-center mb-4 text-light">Leave Requests</h4>
        <div className="row justify-content-center">
          {leaves?.length > 0 ? (
            leaves.map((leave) => (
              <div key={leave.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card shadow-sm p-3 bg-light bg-opacity-90">
                  <h6 className="fw-bold text-dark">
                    {getEmployeeName(leave.employeeId)}
                  </h6>
                  <p className="text-muted mb-1">
                    <strong>Reason:</strong> {leave.reason || "N/A"}
                  </p>
                  <p className="mb-2 text-dark">
                    Days: {leave.days || "—"} |
                    <span
                      className={`badge ms-2 ${
                        leave.status === "Approved"
                          ? "bg-success"
                          : leave.status === "Rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </p>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleStatusChange(leave.id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleStatusChange(leave.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-light">No leave requests yet.</p>
          )}
        </div>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Employee</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleAddEmployee}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newEmployee.name}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newEmployee.email}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newEmployee.department}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          department: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HRDashboard;
