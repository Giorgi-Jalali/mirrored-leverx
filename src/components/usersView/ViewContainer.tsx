import React, { useState } from "react";

import GridView from "./GridView";
import ListView from "./ListView";

import gridIcon from "/public/assets/grid.png";
import listIcon from "/public/assets/list.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import useFilteredEmployees from "../../hooks/useFilteredEmployees";
import { useGetEmployeesQuery } from "../../services/employeeApi";

const ViewContainer: React.FC = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const searchQuery = useSelector((state: RootState) => state.search.query);

  const { data: employees, isLoading, isError } = useGetEmployeesQuery();

  

  const filteredEmployees = useFilteredEmployees(employees || []);

  const handleToggleView = (view: "grid" | "list") => {
    setViewType(view);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (isError || !employees) {
    return <div>Error loading employees</div>;
  }

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
