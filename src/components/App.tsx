import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "../sass/base/_base.scss";
import "../sass/base/_typography.scss";

import Home from "../pages/Home";
import User from "../pages/User";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import Header from "./header/Header";

interface Manager {
  id: string;
  first_name: string;
  last_name: string;
}

interface Employee {
  id: string;
  password: string;
  passwordHash: string;
  role: string;
  first_name: string;
  last_name: string;
  user_avatar: string;
  first_native_name: string;
  last_native_name: string;
  middle_native_name: string;
  department: string;
  building: string;
  room: string;
  desk_number: string;
  date_birth: { day: number; month: number; year: number };
  manager: Manager;
  phone: string;
  email: string;
  skype: string;
  cnumber: string;
  citizenship: string;
}

export const dbUrl = "http://localhost:3001/users/";

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentUser, setCurrentUser] = useState<Employee | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedEmail =
      localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
    setIsAuthenticated(!!storedEmail);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch(`${dbUrl}`)
      .then((response) => response.json())
      .then((data: Employee[]) => {
        setEmployees(data);

        const storedEmail =
          localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");

        if (storedEmail) {
          const foundUser = data.find((employee) => employee.email === storedEmail);

          if (foundUser) {
            setCurrentUser(foundUser);

            localStorage.setItem("currentUserRole", foundUser.role);
            localStorage.setItem("currentUserId", foundUser.id);
            sessionStorage.setItem("currentUserRole", foundUser.role);
            sessionStorage.setItem("currentUserId", foundUser.id);
          }
        }
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return (
    <Router>
      <>
        <Header currentUser={currentUser} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route
            path="/home"
            element={
              <Home
                employees={employees}
                searchQuery={searchQuery}
                handleSearch={handleSearch}
              />
            }
          />
          <Route
            path="/settings"
            element={<Settings employees={employees} />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/user/:id" element={<User />} />
          {/* <Route path="/" element={<User />} /> */}
          {/* Default redirect to Home */}
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
