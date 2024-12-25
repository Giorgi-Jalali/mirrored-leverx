import React from "react";

import notFound from "/public/assets/404.png";
import { IEmployee } from "../../types/EmployeeTypes";

interface NoResultsProps {
  employees: IEmployee[];
  searchQuery: Record<string, string>;
}

const NoResults: React.FC<NoResultsProps> = ({ employees, searchQuery }) => {
  if (employees.length === 0 && Object.values(searchQuery).some((field) => field !== "")) {
    return (
      <div className="not-found">
        <img src={notFound} alt="not found" width="400px" height="225px" />
      </div>
    );
  }
  return null;
};

export default NoResults;
