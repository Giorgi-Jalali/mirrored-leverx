import React from "react";

import suitcase from "/public/assets/suitcase.png";
import door from "/public/assets/door.png";
import notFound from "/public/assets/404.png";
import { Link } from "react-router-dom";
import { TViewProps } from "../../types/EmployeeTypes";

const GridView: React.FC<TViewProps> = ({ employees, searchQuery }) => {
  if (searchQuery && employees.length === 0) {
    return (
      <div className="not-found">
        <img src={notFound} alt="not found" width="400px" height="225px" />
      </div>
    );
  }

  return (
    <ul className="section-body" >
      {employees.map((person) => (
        <li key={person.id} className="employee">
          <Link to={`../user/${person.id}`} className="employee-link">
            <div className="image-center">
              <img
                src={person.user_avatar}
                alt={`${person.first_name} ${person.last_name}`}
                width="120px"
                height="120px"
              />
              <p className="employee-name">{`${person.first_name} ${person.last_name}`}</p>
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
      ))}
    </ul>
  );
};

export default GridView;
