import React from "react";

import camera from "/public/assets/camera.png";
import manName from "/public/assets/man-name.png";
import suitcase from "/public/assets/suitcase.png";
import door from "/public/assets/door.png";

import "../../sass/components/employee/_employee-list-header.scss";

const EmployeeListHeader = () => {
  return (
    <div className="list-header">
      <div className="photo-name">
        <div className="photo">
          <img src={camera} alt="Photo icon" width="15px" height="15px" />
          <p>Photo</p>
        </div>
        <div className="photo">
          <img src={manName} alt="Name icon" width="15px" height="15px" />
          <p>Name</p>
        </div>
      </div>
      <div className="dep-room">
        <div className="photo">
          <img src={suitcase} alt="Job icon" width="15px" height="15px" />
          <p>Department</p>
        </div>
        <div className="photo">
          <img src={door} alt="Room icon" width="15px" height="15px" />
          <p>Room</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeListHeader;
