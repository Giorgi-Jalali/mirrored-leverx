import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import User from "./pages/User";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";

import Header from "./components/header/Header";
import { useAuth } from "./hooks/useAuth";
import { useSessionManager } from "./hooks/useSessionManager";
import {
  HOME,
  HOME_PAGE,
  SETTINGS_PAGE,
  USER_DYNAMIC_PAGE,
  ANY_PAGE,
} from "./constants/constants";
import "./sass/base/_base.scss";

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
            <Route path={HOME} element={<Home />} />
            <Route path={SETTINGS_PAGE} element={<Settings />} />
            <Route path={`${USER_DYNAMIC_PAGE}:id`} element={<User />} />
            <Route path={ANY_PAGE} element={<NotFound />} />
            <Route path={HOME_PAGE} element={<Navigate to={HOME} />} />
          </Routes>
        </>
      ) : (
        <SignIn />
      )}
    </Router>
  );
};

export default App;
