import React from "react";

import cNumber from "/public/assets/c-number.png";
import mobile from "/public/assets/mobile.png";
import email from "/public/assets/email.png";
import skype from "/public/assets/skype.png";
import InfoInput from "./InfoInput";
import { IUserInfo } from "../../types/EmployeeTypes";

const Contacts: React.FC<IUserInfo> = ({
  updatedUser,
  handleInputChange,
  editMode,
}) => {
  return (
    <div>
      <h3>CONTACTS</h3>
      <div className="line"></div>
      <div className="info-container">
        <div className="info-left">
          <div className="info-list">
            <img src={mobile} alt="Mobile icon" width="20px" height="20px" />
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
            <img src={cNumber} alt="C-Number icon" width="20px" height="20px" />
            <p>C-Number</p>
          </div>
        </div>
        <div className="info-right">
          <InfoInput
            type="tel"
            id="phone"
            value={updatedUser?.phone || ""}
            onChange={handleInputChange}
            disabled={!editMode}
          />
          <InfoInput
            type="email"
            id="email"
            value={updatedUser?.email || ""}
            onChange={handleInputChange}
            disabled={!editMode}
          />
          <InfoInput
            id="skype"
            value={updatedUser?.skype || ""}
            onChange={handleInputChange}
            disabled={!editMode}
          />
          <InfoInput
            id="c-number"
            value={updatedUser?.cnumber || ""}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
