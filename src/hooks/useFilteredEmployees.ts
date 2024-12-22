import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { IEmployee } from "../types/EmployeeTypes";

const useFilteredEmployees = (employees: IEmployee[]) => {

  const { name, email, phone, skype, building, room, department } = useSelector(
    (state: RootState) => state.advancedSearch
  );

  const [filteredEmployees, setFilteredEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    if (
      name.trim() === "" &&
      email.trim() === "" &&
      phone.trim() === "" &&
      skype.trim() === "" &&
      building.trim() === "" &&
      room.trim() === "" &&
      department.trim() === ""
    ) {
      setFilteredEmployees(employees);
    } else {
      const lowerCaseName = name.toLowerCase();
      const lowerCaseEmail = email.toLowerCase();
      const lowerCasePhone = phone.toLowerCase();
      const lowerCaseSkype = skype.toLowerCase();
      const lowerCaseBuilding = building.toLowerCase();
      const lowerCaseRoom = room.toLowerCase();
      const lowerCaseDepartment = department.toLowerCase();

      const filtered = employees.filter((employee) => {
        return (
          (name
            ? employee.first_name?.toLowerCase().includes(lowerCaseName) ||
              employee.last_name?.toLowerCase().includes(lowerCaseName)
            : true) &&
          (email
            ? employee.email?.toLowerCase().includes(lowerCaseEmail)
            : true) &&
          (phone ? employee.phone?.includes(lowerCasePhone) : true) &&
          (skype
            ? employee.skype?.toLowerCase().includes(lowerCaseSkype)
            : true) &&
          (building
            ? employee.building?.toLowerCase().includes(lowerCaseBuilding)
            : true) &&
          (room
            ? employee.room?.toLowerCase().includes(lowerCaseRoom)
            : true) &&
          (department
            ? employee.department?.toLowerCase().includes(lowerCaseDepartment)
            : true)
        );
      });

      setFilteredEmployees(filtered);
    }
  }, [employees, name, email, phone, skype, building, room, department]);

  return filteredEmployees;
};

export default useFilteredEmployees;
