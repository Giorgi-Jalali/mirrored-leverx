import React from "react";
import InfoInput from "./InfoInput";
import { IUserInfo } from "../../types/EmployeeTypes";
import less from "/public/assets/less.png";
import copy from "/public/assets/copy.png";

import pen from "/public/assets/pen.png";
import { Link } from "react-router-dom";

const UserAside: React.FC<IUserInfo> = ({
  updatedUser,
  handleInputChange,
  editMode,
  user,
  currentUser,
  handleEditClick,
}) => {
  return (
    <div className="user-aside">
      <Link to="/" className="back">
        <img src={less} alt="Back arrow" width="15px" height="15px" />
      </Link>
      <img
        src={user?.user_avatar}
        alt={user?.first_name}
        width="120px"
        height="120px"
      />

      <div className="user-name-input">
        <InfoInput
          id="first_name"
          value={updatedUser?.first_name || ""}
          onChange={handleInputChange}
          disabled={!editMode}
        />
        <InfoInput
          id="last_name"
          value={updatedUser?.last_name || ""}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>
      <div className="user-name-input">
        <InfoInput
          id="first_native_name"
          value={updatedUser?.first_native_name || ""}
          onChange={handleInputChange}
          disabled={!editMode}
        />

        <InfoInput
          id="middle_native_name"
          value={updatedUser?.middle_native_name || ""}
          onChange={handleInputChange}
          disabled={!editMode}
        />

        <InfoInput
          id="last_native_name"
          value={updatedUser?.last_native_name || ""}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className="copy">
        <img src={copy} alt="Copy icon" width="30px" height="30px" />
        <p>Copy link</p>
      </div>

      {currentUser?.role === "admin" ||
      (currentUser?.role === "hr" && user?.manager?.id == currentUser?.id) ? (
        <div className="edit" onClick={handleEditClick}>
          <img src={pen} alt="Edit icon" width="25px" height="25px" />
          <p>Edit</p>
        </div>
      ) : null}
    </div>
  );
};

export default UserAside;
