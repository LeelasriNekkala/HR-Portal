📊 HR Portal Application
📌 Project Overview

The HR Portal Application is a web-based system that helps HR teams manage employees efficiently.
It provides features such as employee management, authentication, and department tracking.

The application is built using React for the frontend and React Query for server state management, making API data fetching, caching, and synchronization efficient.

🚀 Features

🔐 User Authentication (Login / Signup)

👨‍💼 Employee Dashboard

📋 Employee List Management

➕ Add New Employees

🏢 Department Management

🛡 Protected Routes

⚡ Fast API Data Fetching with React Query

🔄 Automatic Data Refetching and Caching

🛠 Tech Stack
Frontend

⚛️ React

⚡ Vite

🔄 TanStack Query

🌐 JSON Server

Other Tools

📦 npm

🧑‍💻 VS Code

🗂 Git & GitHub

📂 Project Structure
HR-PORTAL
│
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── EmployeeDashboard.jsx
│   │   ├── HRDashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── services
│   ├── App.jsx
│   └── main.jsx
│
├── db.json
├── index.html
├── package.json
└── README.md
📊 API Data Example

The application uses a mock API with JSON Server.

Example employee data:

{
  "employees": [
    {
      "id": "1",
      "name": "John",
      "department": "HR",
      "email": "john@example.com"
    },
    {
      "id": "2",
      "name": "Jane",
      "department": "Finance",
      "email": "jane@example.com"
    }
  ]
}
⚙️ Installation & Setup
1️⃣ Clone Repository
https://github.com/LeelasriNekkala/HR-Portal.git
2️⃣ Install Dependencies
npm install
3️⃣ Start JSON Server
npx json-server --watch db.json --port 3000
4️⃣ Start React Application
npm run dev
🔄 React Query Usage

The project uses React Query for server state management.

Example:

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchEmployees = async () => {
  const { data } = await axios.get("http://localhost:3000/employees");
  return data;
};

const { data, isLoading } = useQuery({
  queryKey: ["employees"],
  queryFn: fetchEmployees,
});

Benefits:

Automatic caching

Background refetching

Loading & error states

Efficient API management

📸 Screenshots

Add your project UI screenshots here.

screenshots/
login.png
dashboard.png
employees.png

Example:

![Login](screenshots/login.png)
![Dashboard](screenshots/dashboard.png)
🎯 Future Improvements

Role-based access control

Employee attendance tracking

Leave management system

Backend integration with Node.js and MongoDB

Deployment with cloud services

👩‍💻 Author

Leela Sri
MERN Stack Developer

⭐ Conclusion

This project demonstrates:

Modern React application architecture

Efficient server state management with React Query

Clean component-based development
