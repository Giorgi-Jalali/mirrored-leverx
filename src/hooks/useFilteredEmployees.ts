import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { IEmployee } from "../types/EmployeeTypes";

const useFilteredEmployees = (employees: IEmployee[]) => {
  const searchCriteria = useSelector(
    (state: RootState) => state.advancedSearch
  );
  const [filteredEmployees, setFilteredEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    const isCriteriaEmpty = Object.values(searchCriteria).every(
      (value) => value.trim() === ""
    );

    if (isCriteriaEmpty) {
      setFilteredEmployees(employees);
    } else {
      const lowerCaseCriteria = Object.fromEntries(
        Object.entries(searchCriteria).map(([key, value]) => [
          key,
          value.toLowerCase(),
        ])
      );

      const filtered = employees.filter((employee) =>
        Object.entries(lowerCaseCriteria).every(([key, value]) => {
          if (value === "") return true;
          const fieldValue = employee[key as keyof IEmployee]
            ?.toString()
            .toLowerCase();
          return fieldValue?.includes(value);
        })
      );

      setFilteredEmployees(filtered);
    }
  }, [employees, searchCriteria]);

  return filteredEmployees;
};

export default useFilteredEmployees;
