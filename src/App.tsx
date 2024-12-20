import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useGetEmployeesQuery } from "./services/employeeApi";

import "./sass/base/_base.scss";
import "./sass/base/_typography.scss";

import Home from "./pages/Home";
import User from "./pages/User";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Header from "./components/header/Header";

import { IEmployee } from "./types/EmployeeTypes";

import { useAuth } from "./hooks/useAuth";

export const dbUrl = "http://localhost:3001/users/";

const App: React.FC = () => {
  const { data: employees, error, isLoading } = useGetEmployeesQuery();
  const [currentUser, setCurrentUser] = useState<IEmployee | undefined>();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (employees) {
      const storedEmail =
        localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");

      if (storedEmail && !currentUser) {
        const foundUser = employees.find(
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
    }
  }, [employees, currentUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return (
    <Router>
      <Header currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Home employees={employees} />} />
        <Route path="/settings" element={<Settings employees={employees} />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
