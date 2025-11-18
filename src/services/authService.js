const API_URL = "http://localhost:5000"; // 👈 Add your JSON server URL

const KEY_USERS = "hrportal_users";
const KEY_AUTH = "hrportal_auth";

function _readUsers() {
  return JSON.parse(localStorage.getItem(KEY_USERS) || "[]");
}

function _writeUsers(users) {
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
}

// ✅ Helper function — automatically adds employee to db.json (if role = "employee")
async function _addEmployeeToDB(user) {
  try {
    const res = await fetch(`${API_URL}/employees`);
    const employees = await res.json();

    const alreadyExists = employees.find(
      (e) => String(e.id) === String(user.id)
    );

    if (!alreadyExists) {
      const newEmployee = {
        id: user.id,
        name: user.username,
        email: `${user.username}@gmail.com`,
        department: "General",
      };

      await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });
      console.log("✅ Employee added to db.json:", newEmployee);
    }
  } catch (err) {
    console.error("❌ Failed to add employee to db.json:", err);
  }
}

export default {
  async signup({ username, password, role }) {
    const users = _readUsers();
    const exists = users.find((u) => u.username === username);
    if (exists) throw new Error("User already exists");

    const newUser = {
      id: Date.now().toString(),
      username,
      password,
      role,
    };

    users.push(newUser);
    _writeUsers(users);

    // ✅ Add to employees db if it's an employee signup
    if (role === "employee") {
      await _addEmployeeToDB(newUser);
    }
  },

  login({ username, password }) {
    const users = _readUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) throw new Error("Invalid credentials");
    localStorage.setItem(KEY_AUTH, JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem(KEY_AUTH);
  },

  getAuth() {
    const user = JSON.parse(localStorage.getItem(KEY_AUTH) || "null");
    if (!user) return null;
    return { ...user, id: String(user.id) };
  },
};
