import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Employee } from "../types/EmployeeTypes";

const useFilteredEmployees = (employees: Employee[]) => {
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

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

  return filteredEmployees;
};

export default useFilteredEmployees;
