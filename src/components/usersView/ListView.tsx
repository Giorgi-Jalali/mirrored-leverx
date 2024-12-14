import React from "react";

type Employee = {
    id: string;
    first_name: string;
    last_name: string;
    role: string;
    user_avatar: string;
    department: string;
    room: string;
  };

  type ListViewProps = {
    employees: Employee[];
  };
  
  const ListView: React.FC<ListViewProps> = ({ employees }) => {
    if (employees.length === 0) {
      return (
        <div className="not-found">
          <img src="../assets/404.png" alt="not found" width="400px" height="225px" />
        </div>
      );
    }
  
    return (
      <ul className="section-body-list" style={{ display: "flex" }}>
        <div className="list-header">
          <div className="photo-name">
            <div className="photo">
              <img src="./assets/camera.png" alt="Photo icon" width="15px" height="15px" />
              <p>Photo</p>
            </div>
            <div className="photo">
              <img src="./assets/man-name.png" alt="Name icon" width="15px" height="15px" />
              <p>Name</p>
            </div>
          </div>
          <div className="dep-room">
            <div className="photo">
              <img src="./assets/suitcase.png" alt="Job icon" width="15px" height="15px" />
              <p>Department</p>
            </div>
            <div className="photo">
              <img src="./assets/door.png" alt="Room icon" width="15px" height="15px" />
              <p>Room</p>
            </div>
          </div>
        </div>
        {employees.map((person) => (
          <li key={person.id} className="employee-list">
            <a href={`../users.html?id=${person.id}`} className="list-employee-view">
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
            </a>
          </li>
        ))}
      </ul>
    );
  };

  export default ListView;