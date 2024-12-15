import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../sass/layout/_header.scss";

import question from "../../assets/question.png";
import logOut from "../../assets/logout.png";
import SignIn from "../../pages/SignIn";

interface Manager {
  id: string;
  first_name: string;
  last_name: string;
}

interface Employee {
  id: string;
  role: string;
  first_name: string;
  last_name: string;
  user_avatar: string;
  department: string;
  phone: string;
  email: string;
  citizenship: string;
  manager: Manager;
}

interface HeaderProps {
    currentUser: Employee | undefined;
    setIsAuthenticated: (bool: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, setIsAuthenticated }) => {
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    localStorage.removeItem("userEmail");
    localStorage.removeItem("currentUserRole");
    localStorage.removeItem("currentUserId");

    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("currentUserRole");
    sessionStorage.removeItem("currentUserId");

    setIsAuthenticated(false);
  };

  return (
    <header>
      <Link to="/" className="home-link-wrap">
        <div className="home-link">
          <p>LEVERX</p>
          <h1>EMPLOYEE SERVICES</h1>
        </div>
      </Link>

      <div className="tabs">
        <Link to="/" className="home-link-wrap">
          <p className="active-tab">Address Book</p>
        </Link>
        <Link to="../settings" className="home-link-wrap" id="settings">
          <p>Settings</p>
        </Link>
      </div>

      <nav>
        <Link to="#support" className="nav-link">
          <img
            src={question}
            alt="Support icon"
            width="30px"
            height="30px"
          />
          <p>SUPPORT</p>
        </Link>

        <Link to={`./user/${currentUser?.id}`} className="nav-link" id="user-profile-link">
          <img
            src={currentUser?.user_avatar}
            alt={`${currentUser?.first_name} ${currentUser?.last_name}`}
            width="30px"
            height="30px"
            id="user-image"
          />
          <p id="user-name">{`${currentUser?.first_name} ${currentUser?.last_name}`}</p>
        </Link>

        <Link to="#logout" className="nav-link" id="logout-button" onClick={handleLogout}>
          <img
            src={logOut}
            alt="Logout icon"
            width="30px"
            height="30px"
          />
          <p>LOGOUT</p>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
