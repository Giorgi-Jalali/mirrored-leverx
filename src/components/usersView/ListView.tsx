import React from "react";

import camera from "/public/assets/camera.png";
import manName from "/public/assets/man-name.png";
import suitcase from "/public/assets/suitcase.png";
import door from "/public/assets/door.png";
import { Link } from "react-router-dom";
import { TViewProps } from "../../types/EmployeeTypes";
import NoResults from "./NoResults";

const ListView: React.FC<TViewProps> = ({ employees, searchQuery }) => {
  return (
    <>
      <NoResults employees={employees} searchQuery={searchQuery} />

      <ul className="section-body-list">
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
        {employees.map((person) => (
          <li key={person.id} className="employee-list">
            <Link to={`../user/${person.id}`} className="list-employee-view">
              <div className="person-image-name">
                <img
                  src={person.user_avatar}
                  alt={`${person.first_name} ${person.last_name}`}
                  width="60px"
                  height="60px"
                />
                <p className="employee-name">{`${person.first_name} ${person.last_name}`}</p>
              </div>
              <div className="dep-room">
                <p className="department">{person.department}</p>
                <p>{person.room}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListView;
