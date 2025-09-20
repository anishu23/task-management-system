# Task Management System

A simple Task Management System built with **.NET Core** (backend) and **React** (frontend).

> **Note:**  
> This project is for demonstration purposes only. The backend uses in-memory data storage, so all data (including users) will be lost when the server restarts. This is not production-ready and many optimizations are possible.

---

## Folder Structure

```
task-management-system/
├── backend/                # .NET Core Web API
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   └── ... (other backend files)
├── frontend/               # React application
│   ├── src/
│   ├── public/
│   └── ... (other frontend files)
├── README.md
└── ... (other project files)
```

---

## Running the Project Locally

### Prerequisites

- [.NET Core SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)

### 1. Start the Backend

Open a new terminal and run the below command

```bash
cd backend
dotnet run --launch-profile https
```

The backend will start on `http://localhost:7117` (or as configured).
API docs: `https://localhost:7117/swagger/index.html`

### 2. Start the Frontend

Open a new terminal and run the below command

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173` (or as configured).

---

## Key Points

- **In-memory data:** All data is lost on backend restart. You must create new users each time.
- **Demonstration only:** This project showcases full stack skills. It is not optimized for production.
- **Local use:** Intended for local demonstration and learning purposes only.

---

## Possible Improvements

- Use a persistent database (e.g., SQL Server, PostgreSQL)
- Improve error handling and validation
- Optimize frontend and backend performance

---

Feel free to explore and modify the project!
