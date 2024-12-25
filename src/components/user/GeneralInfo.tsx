import React from "react";

import suitcase from "/public/assets/suitcase.png";
import building from "/public/assets/building.png";
import door from "/public/assets/door.png";
import number from "/public/assets/number.png";
import date from "/public/assets/date.png";
import manName from "/public/assets/man-name.png";

import { IUserInfo } from "../../types/EmployeeTypes";
import InfoInput from "./InfoInput";
import { formatDateOfBirth } from "../../utils/dateUtils";

const GeneralInfo: React.FC<IUserInfo> = ({
  updatedUser,
  handleInputChange,
  editMode,
}) => {

  return (
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
            <img src={manName} alt="Manager icon" width="20px" height="20px" />
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
            <option value="cybersecurity">Cybersecurity & Compliance</option>
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
          <InfoInput
            id="room"
            value={updatedUser?.room || ""}
            onChange={handleInputChange}
            disabled={!editMode}
          />
          <InfoInput
            id="desk_number"
            value={updatedUser?.desk_number || ""}
            onChange={handleInputChange}
            disabled={!editMode}
          />
          <input
            type="date"
            id="date_birth"
            value={updatedUser?.date_birth ? formatDateOfBirth(updatedUser.date_birth) : ""}
            onChange={handleInputChange}
            disabled={!editMode}
          />
          <p>
            {updatedUser?.manager.first_name
              ? updatedUser.manager.first_name + updatedUser.manager.last_name
              : "No Manager"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
