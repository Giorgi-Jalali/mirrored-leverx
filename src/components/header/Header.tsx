import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import logOut from "/public/assets/logout.png";
import sun from "/public/assets/sun.png";
import moon from "/public/assets/moon.png";

import HeaderButton from "./HeaderButton";
import { useAuth } from "../../hooks/useAuth";
import { RootState } from "../../redux/store";
import { clearCurrentUser } from "../../redux/slices/currentUserSlice";
import { ADMIN, DARK, HOME, SETTINGS_PAGE, USER_DYNAMIC_PAGE, USER_EMAIL } from "../../constants/constants";
import "../../sass/layout/_header.scss";

import { useTheme } from "../../hooks/useTheme";

const Header: React.FC = () => {
  const location = useLocation();

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const { setIsAuthenticated } = useAuth();
  const dispatch = useDispatch();

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
    
      localStorage.removeItem(USER_EMAIL);
      sessionStorage.removeItem(USER_EMAIL);
    
      dispatch(clearCurrentUser());
      setIsAuthenticated(false);
    };



  const { theme, toggleTheme } = useTheme();

//   return (
//     <button >
// txt={Switch to {theme === "light" ? "Dark" : "Light"} Mode}
//       
//     </button>
//   );
// };
    

  return (
    <header>
      <Link to={HOME} className="home-link-wrap">
        <div className="home-link">
          <p>LEVERX</p>
          <h1>EMPLOYEE SERVICES</h1>
        </div>
      </Link>

      <div className="tabs">
        <Link
          to={HOME}
          className={`home-link-wrap ${
            location.pathname !== SETTINGS_PAGE ? "active-tab" : ""
          }`}
        >
          <p>Address Book</p>
        </Link>
        {currentUser?.role === ADMIN && (
          <Link
            to={SETTINGS_PAGE}
            className={`home-link-wrap ${
              location.pathname === SETTINGS_PAGE ? "active-tab" : ""
            }`}
            id="settings"
          >
            <p>Settings</p>
          </Link>
        )}
      </div>

      <nav>
        <HeaderButton
          imgSrc={theme === DARK ? sun : moon}
          imgAlt={"theme icon"}
          path={"#theme"}
          clickHandler={toggleTheme}
        />
        <HeaderButton
          imgSrc={currentUser?.user_avatar}
          imgAlt={`${currentUser?.first_name} ${currentUser?.last_name}`}
          txt={`${currentUser?.first_name} ${currentUser?.last_name}`}
          path={`${USER_DYNAMIC_PAGE}${currentUser?.id}`}
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
