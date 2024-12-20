import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useGetEmployeesQuery } from "./services/employeeApi";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./redux/slices/currentUserSlice";
import { RootState } from "./redux/store";

import "./sass/base/_base.scss";
import "./sass/base/_typography.scss";

import Home from "./pages/Home";
import User from "./pages/User";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Header from "./components/header/Header";

import { useAuth } from "./hooks/useAuth";

export const dbUrl = "http://localhost:3001/users/";

const App: React.FC = () => {
  const { data: employees, isLoading } = useGetEmployeesQuery();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
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
          dispatch(setCurrentUser(foundUser));
        }
      }

      if (currentUser) {
        localStorage.setItem("currentUserRole", currentUser.role);
        localStorage.setItem("currentUserId", currentUser.id);
        sessionStorage.setItem("currentUserRole", currentUser.role);
        sessionStorage.setItem("currentUserId", currentUser.id);
      }
    }
  }, [employees, currentUser, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return (
    <Router>
      <Header />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
