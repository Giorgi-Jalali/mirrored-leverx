import React from "react";
import { Link } from "react-router-dom";
import "../../sass/layout/_header.scss";

import question from "../../assets/question.png";
import logOut from "../../assets/logout.png";

export default function Header() {

    const handleLogout = (event: MouseEvent): void => {
        event.preventDefault();

    localStorage.removeItem("userEmail");
    localStorage.removeItem("currentUserRole");
    localStorage.removeItem("currentUserId");

    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("currentUserRole");
    sessionStorage.removeItem("currentUserId");

    // window.location.href = `${window.location.origin}/sign-in.html`;
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
                <Link
                    to="../settings"
                    className="home-link-wrap"
                    id="settings"
                >
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

                <Link
                    to="./user/1"
                    className="nav-link"
                    id="user-profile-link"
                >
                    <img
                        src={question}
                        alt="Profile icon"
                        width="30px"
                        height="30px"
                        id="user-image"
                    />
                    <p id="user-name"></p>
                </Link>

                <Link to="#logout" className="nav-link" id="logout-button"  onClick={handleLogout}>
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
}
