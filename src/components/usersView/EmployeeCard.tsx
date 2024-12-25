import React from "react";
import { Link } from "react-router-dom";

import suitcase from "/public/assets/suitcase.png";
import door from "/public/assets/door.png";

import { IPerson } from "../../types/EmployeeTypes";

import "../../sass/components/employee/_employee-card.scss";

const EmployeeCard: React.FC<IPerson> = ({ person }) => {
  return (
    <li key={person.id} className="employee">
      <Link to={`../user/${person.id}`} className="employee-link">
        <div className="image-center">
          <img
            src={person.user_avatar}
            alt={`${person.first_name} ${person.last_name}`}
            width="120px"
            height="120px"
          />
          <p className="employee-card-name">{`${person.first_name} ${person.last_name}`}</p>
        </div>
        <div className="line"></div>
        <div className="employee-job">
          <div className="person-job">
            <img src={suitcase} alt="Job icon" width="20px" height="20px" />
            <p>{person.department}</p>
          </div>
          <div className="person-job">
            <img src={door} alt="Room icon" width="20px" height="20px" />
            <p>{person.room}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default EmployeeCard;
