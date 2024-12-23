import React from "react";
import suitcase from "/public/assets/suitcase.png";
import door from "/public/assets/door.png";
import { Link } from "react-router-dom";
import { TViewProps } from "../../types/EmployeeTypes";
import NoResults from "./NoResults";

const GridView: React.FC<TViewProps> = ({ employees, searchQuery }) => {
  return (
    <>
      <NoResults employees={employees} searchQuery={searchQuery} />

      <ul className="section-body">
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
                  <img
                    src={suitcase}
                    alt="Job icon"
                    width="20px"
                    height="20px"
                  />
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
    </>
  );
};

export default GridView;
