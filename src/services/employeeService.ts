import { IEmployee } from "../types/EmployeeTypes";

export const fetchEmployees = async (): Promise<IEmployee[]> => {
  const response = await fetch("http://localhost:3001/users/");
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return response.json();
};
