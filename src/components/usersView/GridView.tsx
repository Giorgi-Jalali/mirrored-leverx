import React from "react";


import suitcase from "../../assets/suitcase.png";
import door from "../../assets/door.png";
import notFound from "../../assets/404.png";
import { Link } from "react-router-dom";

type Employee = {
    id: string;
    first_name: string;
    last_name: string;
    role: string;
    user_avatar: string;
    department: string;
    room: string;
  };


type GridViewProps = {
    employees: Employee[];
  };
  
  const GridView: React.FC<GridViewProps> = ({ employees }) => {
    if (employees.length === 0) {
      return (
        <div className="not-found">
          <img src={notFound} alt="not found" width="400px" height="225px" />
        </div>
      );
    }
  
    return (
      <ul className="section-body" style={{ display: "grid" }}>
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