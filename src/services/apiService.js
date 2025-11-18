const API_URL = "http://localhost:5000";

// ✅ Get all employees
export const getEmployees = async () => {
  const response = await fetch(`${API_URL}/employees`);
  if (!response.ok) throw new Error("Failed to fetch employees");
  return response.json();
};

// ✅ Get all leaves
export const getLeaves = async () => {
  const response = await fetch(`${API_URL}/leaves`);
  if (!response.ok) throw new Error("Failed to fetch leaves");
  return response.json();
};

// ✅ Get leaves by employeeId (for Employee Dashboard)
export const getLeavesByEmployee = async (employeeId) => {
  const response = await fetch(`${API_URL}/leaves?employeeId=${employeeId}`);
  if (!response.ok) throw new Error("Failed to fetch employee leaves");
  return response.json();
};

// ✅ Apply Leave (Employee Side)
export const applyLeave = async (leaveData) => {
  // leaveData must include employeeId, reason, days, and status
  const response = await fetch(`${API_URL}/leaves`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leaveData),
  });

  if (!response.ok) throw new Error("Failed to apply for leave");
  return response.json();
};

// ✅ Update leave status (HR Approve/Reject)
export const updateLeaveStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/leaves/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new Error("Failed to update leave");
  return response.json();
};

// ✅ Add new employee
export const addEmployee = async (employeeData) => {
  const response = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) throw new Error("Failed to add employee");
  return response.json();
};
