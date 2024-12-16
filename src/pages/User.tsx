import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dbUrl } from "../components/App";
import "../sass/pages/_user.scss";

import InfoContainer from "../components/user/InfoContainer";

import less from "/public/assets/less.png";
import copy from "/public/assets/copy.png";
import cNumber from "/public/assets/c-number.png";
import pen from "/public/assets/pen.png";
import suitcase from "/public/assets/suitcase.png";
import building from "/public/assets/building.png";
import door from "/public/assets/door.png";
import number from "/public/assets/number.png";
import date from "/public/assets/date.png";
import manName from "/public/assets/man-name.png";
import mobile from "/public/assets/mobile.png";
import email from "/public/assets/email.png";
import skype from "/public/assets/skype.png";
import { Link } from "react-router-dom";

interface IManager {
  id: string;
  first_name: string;
  last_name: string;
}

interface IUser {
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
  manager: IManager;
  phone: string;
  email: string;
  skype: string;
  cnumber: string;
  citizenship: string;
}

const User: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<IUser | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<IUser | null>(null);

  const storedUserRole =
    localStorage.getItem("currentUserRole") ||
    sessionStorage.getItem("currentUserRole");
  const storedUserId =
    localStorage.getItem("currentUserId") ||
    sessionStorage.getItem("currentUserId");

  useEffect(() => {
    fetch(`${dbUrl}${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setUpdatedUser(data);
      })
      .catch((error) => console.error("Error fetching user:", error));
    }, [id]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (updatedUser) {
      const { id, value } = e.target;
      setUpdatedUser({ ...updatedUser, [id]: value });
    }
  };

  const handleSaveClick = () => {
    if (updatedUser) {
      fetch(`${dbUrl}${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => response.json())
        .then(() => {
          alert("User information updated successfully!");
          setEditMode(false);
          setUser(updatedUser);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-main">
      <div className="user-aside">
        <Link to="/" className="back">
          <img src={less} alt="Back arrow" width="15px" height="15px" />
        </Link>
        <img
          src={user.user_avatar}
          alt={user.first_name + user.last_name}
          width="120px"
          height="120px"
        />

        <div className="user-name-input">
          <p>
            <input
              type="text"
              id="first_name"
              value={updatedUser?.first_name || ""}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </p>
          <p>
            <input
              type="text"
              id="last_name"
              value={updatedUser?.last_name || ""}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </p>
        </div>
        <div className="user-name-input">
          <p>
            <input
              type="text"
              value={updatedUser?.first_native_name || ""}
              id="first_native_name"
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </p>
          <p>
            <input
              type="text"
              value={updatedUser?.middle_native_name || ""}
              id="middle_native_name"
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </p>
          <p>
            <input
              type="text"
              value={updatedUser?.last_native_name || ""}
              id="last_native_name"
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </p>
        </div>

        <div className="copy">
          <img src={copy} alt="Copy icon" width="30px" height="30px" />
          <p>Copy link</p>
        </div>

        {storedUserRole === "admin" ||
        (storedUserRole === "hr" && user?.manager?.id == storedUserId) ? (
          <div className="edit" onClick={handleEditClick}>
            <img src={pen} alt="Edit icon" width="25px" height="25px" />
            <p>Edit</p>
          </div>
        ) : null}
      </div>
      <div className="user-section">
        <div>
          <h3>GENERAL INFO</h3>
          <div className="line"></div>
          <div className="info-container">
            <div className="info-left">
              <div className="info-list">
                <img
                  src={suitcase}
                  alt="Suitcase icon"
                  width="20px"
                  height="20px"
                />
                <p>Department</p>
              </div>
              <div className="info-list">
                <img
                  src={building}
                  alt="Building icon"
                  width="20px"
                  height="20px"
                />
                <p>Building</p>
              </div>
              <div className="info-list">
                <img src={door} alt="Door icon" width="20px" height="20px" />
                <p>Room</p>
              </div>
              <div className="info-list">
                <img src={number} alt="Desk icon" width="20px" height="20px" />
                <p>Desk number</p>
              </div>
              <div className="info-list">
                <img src={date} alt="Date icon" width="20px" height="20px" />
                <p>Date of birth</p>
              </div>
              <div className="info-list">
                <img
                  src={manName}
                  alt="Manager icon"
                  width="20px"
                  height="20px"
                />
                <p>Manager</p>
              </div>
            </div>
            <div className="info-right">
              <select
                id="department"
                value={updatedUser?.department || ""}
                onChange={handleInputChange}
                disabled={!editMode}
              >
                <option value="web">Web & Mobile</option>
                <option value="cybersecurity">
                  Cybersecurity & Compliance
                </option>
                <option value="ui">UI/UX Design</option>
                <option value="backend">Backend & Integration</option>
                <option value="ai">AI & Data Science</option>
                <option value="cloud">Cloud & DevOps</option>
              </select>
              <select
                id="building"
                value={updatedUser?.building || ""}
                onChange={handleInputChange}
                disabled={!editMode}
              >
                <option value="building-65">Pilsudskiego 65 (Poland)</option>
                <option value="building-66">Pilsudskiego 66 (Poland)</option>
                <option value="building-67">Pilsudskiego 67 (Poland)</option>
                <option value="building-68">Pilsudskiego 68 (Poland)</option>
                <option value="building-69">Pilsudskiego 69 (Poland)</option>
                <option value="building-70">Pilsudskiego 70 (Poland)</option>
              </select>
              <input
                type="text"
                value={updatedUser?.room || ""}
                id="room"
                onChange={handleInputChange}
                disabled={!editMode}
              />
              <input
                type="text"
                value={updatedUser?.desk_number || ""}
                id="desk_number"
                onChange={handleInputChange}
                disabled={!editMode}
              />
              {/* <p>${formatDate(user.date_birth)}</p> */}
              <input
                type="date"
                value={
                  user.date_birth.year +
                  " " +
                  user.date_birth.month +
                  " " +
                  user.date_birth.day
                }
                id="date_birth"
                disabled
              />
              <p>
                {user.manager.first_name
                  ? user.manager.first_name + user.manager.last_name
                  : "No Manager"}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3>CONTACTS</h3>
          <div className="line"></div>
          <div className="info-container">
            <div className="info-left">
              <div className="info-list">
                <img
                  src={mobile}
                  alt="Mobile icon"
                  width="20px"
                  height="20px"
                />
                <p>Mobile phone</p>
              </div>
              <div className="info-list">
                <img src={email} alt="Email icon" width="20px" height="20px" />
                <p>Email</p>
              </div>
              <div className="info-list">
                <img src={skype} alt="Skype icon" width="20px" height="20px" />
                <p>Skype</p>
              </div>
              <div className="info-list">
                <img
                  src={cNumber}
                  alt="C-Number icon"
                  width="20px"
                  height="20px"
                />
                <p>C-Number</p>
              </div>
            </div>
            <div className="info-right">
              <input
                type="tel"
                value={updatedUser?.phone || ""}
                id="phone"
                onChange={handleInputChange}
                disabled={!editMode}
              />
              <input
                type="email"
                value={updatedUser?.email || ""}
                id="email"
                onChange={handleInputChange}
                disabled={!editMode}
              />
              <input
                type="text"
                value={updatedUser?.skype || ""}
                id="skype"
                onChange={handleInputChange}
                disabled={!editMode}
              />
              <input
                type="text"
                value={updatedUser?.cnumber || ""}
                id="c-number"
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>
          </div>
        </div>
        <div>
          <h3>TRAVEL INFO</h3>
          <div className="line"></div>
          <div className="info-container">
            <InfoContainer
              editMode={editMode}
              updatedUser={updatedUser}
              handleSaveClick={handleSaveClick}
              handleInputChange={handleInputChange}
              handleEditClick={handleEditClick}
            />
          </div>
        </div>
        {storedUserRole === "admin" ||
        (storedUserRole === "hr" && user?.manager?.id == storedUserId) ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default User;
