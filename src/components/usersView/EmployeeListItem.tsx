import React from "react";
import { Link } from "react-router-dom";

import { IPerson } from "../../types/EmployeeTypes";
import "../../sass/components/employee/_employee-list-item.scss";

const EmployeeListItem: React.FC<IPerson> = ({ person }) => {
  return (
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
        <div className="dep-room-item">
          <p>{person.department}</p>
          <p>{person.room}</p>
        </div>
      </Link>
    </li>
  );
};

export default EmployeeListItem;
