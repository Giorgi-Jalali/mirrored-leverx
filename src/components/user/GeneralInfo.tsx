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
import { BUILDING_65, BUILDING_66, BUILDING_67, BUILDING_68, BUILDING_69, BUILDING_70, DEP_AI_DATA_SCIENCE, DEP_BACKEND_INTEGRATION, DEP_CLOUD_DEVOPS, DEP_CYBERSECURITY_COMPLIANCE, DEP_UI_UX_DESIGN, DEP_WEB_MOBILE, OPTION_BUILDING, OPTION_DEPARTMENT } from "../../constants/constants";

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
            id={OPTION_DEPARTMENT}
            value={updatedUser?.department || ""}
            onChange={handleInputChange}
            disabled={!editMode}
          >
            <option value={DEP_WEB_MOBILE}>{DEP_WEB_MOBILE}</option>
            <option value={DEP_CYBERSECURITY_COMPLIANCE}>{DEP_CYBERSECURITY_COMPLIANCE}</option>
            <option value={DEP_UI_UX_DESIGN}>{DEP_UI_UX_DESIGN}</option>
            <option value={DEP_BACKEND_INTEGRATION}>{DEP_BACKEND_INTEGRATION}</option>
            <option value={DEP_AI_DATA_SCIENCE}>{DEP_AI_DATA_SCIENCE}</option>
            <option value={DEP_CLOUD_DEVOPS}>{DEP_CLOUD_DEVOPS}</option>
          </select>
          <select
            id={OPTION_BUILDING}
            value={updatedUser?.building || ""}
            onChange={handleInputChange}
            disabled={!editMode}
          >
            <option value={BUILDING_65}>{BUILDING_65}</option>
            <option value={BUILDING_66}>{BUILDING_66}</option>
            <option value={BUILDING_67}>{BUILDING_67}</option>
            <option value={BUILDING_68}>{BUILDING_68}</option>
            <option value={BUILDING_69}>{BUILDING_69}</option>
            <option value={BUILDING_70}>{BUILDING_70}</option>
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
              ? updatedUser.manager.first_name + " " + updatedUser.manager.last_name
              : "No Manager"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
