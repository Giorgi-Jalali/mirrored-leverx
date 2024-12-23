import React from "react";
import InfoContainer from "./InfoContainer";
import { IUserInfo } from "../../types/EmployeeTypes";

const TravelInfo: React.FC<IUserInfo> = ({
  updatedUser,
  handleInputChange,
  editMode,
}) => {
  return (
    <div>
      <h3>TRAVEL INFO</h3>
      <div className="line"></div>
      <div className="info-container">
        <InfoContainer
          editMode={editMode}
          updatedUser={updatedUser}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default TravelInfo;
