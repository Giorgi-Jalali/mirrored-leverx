import React, { useState, useEffect } from "react";

import GridView from "./GridView";
import ListView from "./ListView";

import gridIcon from "/public/assets/grid.png";
import listIcon from "/public/assets/list.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type Employee = {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  user_avatar: string;
  department: string;
  room: string;
};

interface ViewContainerProps {
  employees: Employee[];
}



const ViewContainer: React.FC<ViewContainerProps> = ({ employees }) => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  
  const searchQuery = useSelector((state: RootState) => state.search.query);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEmployees(employees);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = employees.filter((person) => {
        const fullName = `${person.first_name} ${person.last_name}`.toLowerCase();
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

  const handleToggleView = (view: "grid" | "list") => {
    setViewType(view);
  };

  return (
    <section>
      <p className="displayed-employee-text">
        {filteredEmployees.length} employees displayed
      </p>
      <div className="controls">
        <div className="view-toggle">
          <input
            type="radio"
            id="grid"
            name="view-toggle"
            className="toggle"
            checked={viewType === "grid"}
            onChange={() => handleToggleView("grid")}
          />
          <label htmlFor="grid" className="grid-icon">
            <img src={gridIcon} alt="Grid View" width="20px" height="20px" />
          </label>
          <input
            type="radio"
            id="list"
            name="view-toggle"
            className="toggle"
            checked={viewType === "list"}
            onChange={() => handleToggleView("list")}
          />
          <label htmlFor="list" className="list-icon">
            <img src={listIcon} alt="List View" width="20px" height="20px" />
          </label>
        </div>
      </div>
      <div className="views">
        {viewType === "grid" ? (
          <GridView employees={filteredEmployees} searchQuery={searchQuery} />
        ) : (
          <ListView employees={filteredEmployees} searchQuery={searchQuery} />
        )}
      </div>
    </section>
  );
};

export default ViewContainer;
