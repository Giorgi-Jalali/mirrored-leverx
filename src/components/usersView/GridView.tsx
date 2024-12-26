import React from "react";

import { TViewProps } from "../../types/EmployeeTypes";
import NoResults from "./NoResults";
import EmployeeCard from "./EmployeeCard";

const GridView: React.FC<TViewProps> = ({ employees, searchQuery }) => {
  return (
    <>
      <NoResults employees={employees} searchQuery={searchQuery} />

      <ul className="section-body">
        {employees.map((person) => (
          <EmployeeCard key={person.id} person={person} />
        ))}
      </ul>
    </>
  );
};

export default GridView;
