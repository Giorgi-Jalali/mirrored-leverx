import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./sass/base/_base.scss";
import "./sass/base/_typography.scss";

import Home from "./pages/Home";
import User from "./pages/User";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Header from "./components/header/Header";

import { fetchEmployees } from "./services/employeeService";
import { Employee } from "./types/EmployeeTypes";

export const dbUrl = "http://localhost:3001/users/";

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentUser, setCurrentUser] = useState<Employee | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedEmail =
      localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
    setIsAuthenticated(!!storedEmail);
    setLoading(false);
  }, []);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);

        const storedEmail =
          localStorage.getItem("userEmail") ||
          sessionStorage.getItem("userEmail");

        if (storedEmail) {
          const foundUser = data.find(
            (employee) => employee.email === storedEmail
          );

          if (foundUser) {
            setCurrentUser(foundUser);
            localStorage.setItem("currentUserRole", foundUser.role);
            localStorage.setItem("currentUserId", foundUser.id);
            sessionStorage.setItem("currentUserRole", foundUser.role);
            sessionStorage.setItem("currentUserId", foundUser.id);
          }
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    loadEmployees();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return (
    <Router>
      <Header
        currentUser={currentUser}
        setIsAuthenticated={setIsAuthenticated}
      />

      <Routes>
        <Route path="/" element={<Home employees={employees} />} />
        <Route path="/settings" element={<Settings employees={employees} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
