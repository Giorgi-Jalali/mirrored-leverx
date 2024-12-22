import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetEmployeesQuery } from "../services/employeeApi";
import { setCurrentUser } from "../redux/slices/currentUserSlice";

export const useSessionManager = () => {
  const { data: employees, isLoading } = useGetEmployeesQuery();
  const dispatch = useDispatch();
  

  useEffect(() => {
    const storedEmail =
      localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");

    if (storedEmail) {
      const foundUser = employees?.find(
        (employee) => employee.email === storedEmail
      );

      if (foundUser) {
        dispatch(setCurrentUser(foundUser));
      }
    }
  }, [employees, dispatch]);

  return { isLoading };
};
