import React, { useState } from "react";

import GridView from "./GridView";
import ListView from "./ListView";

import gridIcon from "/public/assets/grid.png";
import listIcon from "/public/assets/list.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import useFilteredEmployees from "../../hooks/useFilteredEmployees";
import { useGetEmployeesQuery } from "../../services/employeeApi";

const GRID_VIEW = "grid";
const LIST_VIEW = "list";
const VIEW_TOGGLE = "view-toggle";
const TOGGLE = "toggle";

type TViewType = typeof GRID_VIEW | typeof LIST_VIEW;

const ViewContainer: React.FC = () => {
  const [viewType, setViewType] = useState<TViewType>(GRID_VIEW);

  const searchQuery = useSelector((state: RootState) => state.search.query);
  const { data: employees, isLoading, isError } = useGetEmployeesQuery();

  const filteredEmployees = useFilteredEmployees(employees || []);

  const handleToggleView = (view: TViewType) => {
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
        <div className={VIEW_TOGGLE}>
          <input
            type="radio"
            id={GRID_VIEW}
            name={VIEW_TOGGLE}
            className={TOGGLE}
            checked={viewType === GRID_VIEW}
            onChange={() => handleToggleView(GRID_VIEW)}
          />
          <label htmlFor={GRID_VIEW} className="grid-icon">
            <img src={gridIcon} alt="Grid View" width="20px" height="20px" />
          </label>
          <input
            type="radio"
            id={LIST_VIEW}
            name={VIEW_TOGGLE}
            className={TOGGLE}
            checked={viewType === LIST_VIEW}
            onChange={() => handleToggleView(LIST_VIEW)}
          />
          <label htmlFor={LIST_VIEW} className="list-icon">
            <img src={listIcon} alt="List View" width="20px" height="20px" />
          </label>
        </div>
      </div>
      <div className="views">
        {viewType === GRID_VIEW ? (
          <GridView employees={filteredEmployees} searchQuery={searchQuery} />
        ) : (
          <ListView employees={filteredEmployees} searchQuery={searchQuery} />
        )}
      </div>
    </section>
  );
};

export default ViewContainer;
