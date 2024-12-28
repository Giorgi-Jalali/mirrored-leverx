import { useState, useEffect } from "react";
import { IEmployee } from "../types/EmployeeTypes";

const useFilteredEmployees = (
  employees: IEmployee[],
  searchCriteria: Record<string, string>
) => {
  const [filteredEmployees, setFilteredEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    const isCriteriaEmpty = Object.values(searchCriteria).every(
      (value) => value.trim() === ""
    );

    const filterEmployees = () => {
      if (isCriteriaEmpty) {
        return employees;
      }

      const lowerCaseCriteria = Object.fromEntries(
        Object.entries(searchCriteria).map(([key, value]) => [
          key,
          value.toLowerCase(),
        ])
      );

      return employees.filter((employee) => {
        const searchQueryMatch =
          employee.first_name
            ?.toLowerCase()
            .includes(lowerCaseCriteria.search_query || "") ||
          employee.last_name
            ?.toLowerCase()
            .includes(lowerCaseCriteria.search_query || "");

        const fieldMatches = Object.entries(lowerCaseCriteria).every(
          ([key, value]) => {
            if (key === "search_query") return true;
            const fieldValue = employee[key as keyof IEmployee]
              ?.toString()
              .toLowerCase();
            return fieldValue?.includes(value);
          }
        );

        return searchQueryMatch && fieldMatches;
      });
    };

    const newFilteredEmployees = filterEmployees();

    if (
      newFilteredEmployees.length !== filteredEmployees.length ||
      !newFilteredEmployees.every(
        (emp, index) => emp === filteredEmployees[index]
      )
    ) {
      setFilteredEmployees(newFilteredEmployees);
    }
  }, [employees, JSON.stringify(searchCriteria), filteredEmployees]);

  return filteredEmployees;
};

export default useFilteredEmployees;
