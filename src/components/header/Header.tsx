import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../sass/layout/_header.scss";

import question from "/public/assets/question.png";
import logOut from "/public/assets/logout.png";
import notFound from "/public/assets/not-found.png";

import HeaderButton from "./HeaderButton";

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
  const location = useLocation();

  const storedUserRole =
    localStorage.getItem("currentUserRole") ||
    sessionStorage.getItem("currentUserRole");

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
        <Link
          to="/"
          className={`home-link-wrap ${
            location.pathname !== "/settings" ? "active-tab" : ""
          }`}
        >
          <p>Address Book</p>
        </Link>
        {storedUserRole === "admin" && (
          <Link
            to="../settings"
            className={`home-link-wrap ${
              location.pathname === "/settings" ? "active-tab" : ""
            }`}
            id="settings"
          >
            <p>Settings</p>
          </Link>
        )}
      </div>

      <nav>
        <HeaderButton
          imgSrc={question}
          imgAlt={"support"}
          txt={"SUPPORT"}
          path={"#support"}
        />
        <HeaderButton
          imgSrc={currentUser?.user_avatar}
          imgAlt={`${currentUser?.first_name} ${currentUser?.last_name}`}
          txt={`${currentUser?.first_name} ${currentUser?.last_name}`}
          path={`./user/${currentUser?.id}`}
        />
        <HeaderButton
          imgSrc={logOut}
          imgAlt={"#logout"}
          txt={"LOGOUT"}
          path={"#logout"}
          clickHandler={handleLogout}
        />
        <HeaderButton
          imgSrc={notFound}
          imgAlt={"not found"}
          txt={"404"}
          path={"./not-found-page"}
        />
      </nav>
    </header>
  );
};

export default Header;
