import React, { useEffect, useState } from "react";
import "../sass/pages/_settings.scss";
import { dbUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateSearchQuery } from "../redux/slices/search/searchSlice";

interface Employee {
  id: string;
  role: string;
  user_avatar: string;
  first_name: string;
  last_name: string;
  first_native_name: string;
  last_native_name: string;
  middle_native_name: string;
  department: string;
  room: string;
}

interface ISettingsProps {
  employees: Employee[];
}

const Settings: React.FC<ISettingsProps> = ({ employees }) => {
  const [storedUserId, setStoredUserId] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<{
    [key: string]: string;
  }>({});
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  const searchQuery = useSelector((state: RootState) => state.search.query);
  const dispatch = useDispatch();

  const handleSearch = (query: string) => {
    dispatch(updateSearchQuery(query));
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEmployees(employees);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = employees.filter((person) => {
        const fullName =
          `${person.first_name} ${person.last_name}`.toLowerCase();
        return (
          person.id.includes(lowerCaseQuery) ||
          person.first_name.toLowerCase().includes(lowerCaseQuery) ||
          person.last_name.toLowerCase().includes(lowerCaseQuery) ||
          fullName.includes(lowerCaseQuery)
        );
      });
      setFilteredEmployees(filtered);
    }
  }, [employees, searchQuery]);

  useEffect(() => {
    const userId =
      localStorage.getItem("currentUserId") ||
      sessionStorage.getItem("currentUserId");
    setStoredUserId(userId);

    const initialRoles: { [key: string]: string } = {};
    filteredEmployees.forEach((employee) => {
      initialRoles[employee.id] = employee.role;
    });
    setSelectedRoles(initialRoles);
  }, [filteredEmployees]);

  const handleRoleChange = (employeeId: string, newRole: string) => {
    const updatedEmployee = filteredEmployees.find(
      (emp) => emp.id === employeeId
    );

    if (updatedEmployee) {
      const updatedData = { ...updatedEmployee, role: newRole };
      fetch(`${dbUrl}${employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((updated) => {
          alert("Role updated successfully:");
          setSelectedRoles((prev) => ({
            ...prev,
            [employeeId]: newRole,
          }));
        })
        .catch((error) => {
          console.error("Error updating role:", error);
        });
    }
  };

  return (
    <div className="settings-main">
      <div className="roles-title">roles & permissions</div>
      <div className="roles-header">
        <div className="settings-left-header">
          <img
            src="../assets/search.png"
            alt="search icon"
            width="20px"
            height="20px"
            className="settings-search"
          />
          <form
            action="./404.html"
            method="GET"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchQuery);
            }}
          >
            <input
              type="text"
              className="search-input"
              placeholder="Type to search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              required
            />
          </form>
        </div>
        <div className="settings-right-header">
          <div className="vertical-line"></div>
          <p>Address book role</p>
        </div>
      </div>
      <div id="settings-Employees">
        {filteredEmployees.map((person) => {
          const isCurrentUser = person.id === storedUserId;

          return (
            <div key={person.id} className="roles-header">
              <div className="basic-content-list">
                <img
                  src={person.user_avatar}
                  alt="person icon"
                  width="50px"
                  height="50px"
                />
                <div className="name">
                  <p>
                    {person.first_name} {person.last_name}
                  </p>
                  <p>
                    {person.first_native_name} {person.middle_native_name}{" "}
                    {person.last_native_name}
                  </p>
                </div>
              </div>
              <div className="role-container">
                {["employee", "hr", "admin"].map((role) => (
                  <React.Fragment key={role}>
                    <input
                      type="radio"
                      name={`address-book-role-${person.id}`}
                      id={`${role}-${person.id}`}
                      className="role-button"
                      checked={selectedRoles[person.id] === role}
                      disabled={isCurrentUser}
                      onChange={() => handleRoleChange(person.id, role)}
                    />
                    <label
                      htmlFor={`${role}-${person.id}`}
                      className={`role-label ${
                        selectedRoles[person.id] === role ? "checked" : ""
                      }`}
                    >
                      {role}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="roles-footer"></div>
    </div>
  );
};

export default Settings;
