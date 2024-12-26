import React from "react";

import { TViewProps } from "../../types/EmployeeTypes";
import NoResults from "./NoResults";
import EmployeeListItem from "./EmployeeListItem";
import EmployeeListHeader from "./EmployeeListHeader";

const ListView: React.FC<TViewProps> = ({ employees, searchQuery }) => {
  return (
    <>
      <NoResults employees={employees} searchQuery={searchQuery} />

      <ul className="section-body-list">
        <EmployeeListHeader />
        {employees.map((person) => (
          <EmployeeListItem key={person.id} person={person} />
        ))}
      </ul>
    </>
  );
};

export default ListView;
