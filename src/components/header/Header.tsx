import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import question from "/public/assets/question.png";
import logOut from "/public/assets/logout.png";

import HeaderButton from "./HeaderButton";
import { useAuth } from "../../hooks/useAuth";
import { RootState } from "../../redux/store";
import { clearCurrentUser } from "../../redux/slices/currentUserSlice";
import "../../sass/layout/_header.scss";

const Header: React.FC = () => {
  const location = useLocation();

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const { setIsAuthenticated } = useAuth();
  const dispatch = useDispatch();

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
    
      localStorage.removeItem("userEmail");
      sessionStorage.removeItem("userEmail");
    
      dispatch(clearCurrentUser());
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
        {currentUser?.role === "admin" && (
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
      </nav>
    </header>
  );
};

export default Header;
