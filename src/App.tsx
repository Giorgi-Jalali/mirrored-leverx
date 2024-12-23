import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./sass/base/_base.scss";

import Home from "./pages/Home";
import User from "./pages/User";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Header from "./components/header/Header";

import { useAuth } from "./hooks/useAuth";
import { useSessionManager } from "./hooks/useSessionManager";

export const dbUrl = "http://localhost:3001/users/";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const { isLoading } = useSessionManager();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/home" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <SignIn />
      )}
    </Router>
  );
};

export default App;
