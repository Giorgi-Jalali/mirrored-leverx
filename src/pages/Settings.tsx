import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";
import useFilteredEmployees from "../hooks/useFilteredEmployees";
import {
  employeeApi,
  useGetEmployeesQuery,
  useUpdateEmployeeRoleMutation,
} from "../services/employeeApi";
import { updateSearchField } from "../redux/slices/advancedSearchSlice";

import { useSnackbar } from "../hooks/useSnackbar";
import SearchForm from "../components/search/SearchForm";
import {
  ADMIN,
  EMPLOYEE,
  HR,
  PLACEHOLDER_SEARCH,
} from "../constants/constants";
import "../sass/pages/_settings.scss";

const Settings: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");

  const { data: employees } = useGetEmployeesQuery();
  const [updateEmployeeRole] = useUpdateEmployeeRoleMutation();

  const [selectedRoles, setSelectedRoles] = useState<{
    [key: string]: string;
  }>({});

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const filteredEmployees = useFilteredEmployees(employees || [], {search_query: searchInput});

  const dispatch = useDispatch<AppDispatch>();

  const { showSnackbar } = useSnackbar();

  const handleInputChange = (value: string) => {
    setSearchInput(value);

    const trimmedValue = value.trim();
    dispatch(updateSearchField({ field: "search_query", value: trimmedValue }));
  };

  useEffect(() => {
    const initialRoles: { [key: string]: string } = {};
    filteredEmployees.forEach((employee) => {
      initialRoles[employee.id] = employee.role;
    });
    setSelectedRoles(initialRoles);
  }, [filteredEmployees]);

  const handleRoleChange = (employeeId: string, newRole: string) => {
    updateEmployeeRole({ id: employeeId, role: newRole })
      .unwrap()
      .then(() => {
        showSnackbar("Role updated successfully.");

        setSelectedRoles((prev) => ({
          ...prev,
          [employeeId]: newRole,
        }));

        dispatch(
          employeeApi.util.updateQueryData(
            "getEmployees",
            undefined,
            (draft) => {
              const employeeIndex = draft.findIndex(
                (emp) => emp.id === employeeId
              );
              if (employeeIndex >= 0) {
                draft[employeeIndex] = {
                  ...draft[employeeIndex],
                  role: newRole,
                };
              }
            }
          )
        );

        dispatch(
          employeeApi.util.invalidateTags([
            { type: "Employee", id: employeeId },
          ])
        );
      })
      .catch((error) => {
        console.error("Error updating role:", error);
      });
  };

  return (
    <div className="settings-main">
      <div className="roles-title">roles & permissions</div>
      <div className="roles-header">
        <div className="settings-left-header">
          <SearchForm
            value={searchInput}
            handleInputChange={handleInputChange}
            className="search-input-settings"
            placeholder={PLACEHOLDER_SEARCH}
            imgClassname="settings-search"
          />
        </div>
        <div className="settings-right-header">
          <div className="vertical-line"></div>
          <p>Address book role</p>
        </div>
      </div>
      <div id="settings-Employees">
        {filteredEmployees.map((person) => {
          const isCurrentUser = person.id === currentUser?.id;

          return (
            <div key={person.id} className="roles-header">
              <div className="basic-content-list">
                <img
                  src={person.user_avatar}
                  alt="person icon"
                  width="50px"
                  height="50px"
                />
                <div className="name">
                  <p>
                    {person.first_name} {person.last_name}
                  </p>
                  <p>
                    {person.first_native_name} {person.middle_native_name}{" "}
                    {person.last_native_name}
                  </p>
                </div>
              </div>
              <div className="role-container">
                {[EMPLOYEE, HR, ADMIN].map((role) => (
                  <React.Fragment key={role}>
                    <input
                      type="radio"
                      name={`address-book-role-${person.id}`}
                      id={`${role}-${person.id}`}
                      className="role-button"
                      checked={selectedRoles[person.id] === role}
                      disabled={isCurrentUser}
                      onChange={() => handleRoleChange(person.id, role)}
                    />
                    <label
                      htmlFor={`${role}-${person.id}`}
                      className={`role-label ${
                        selectedRoles[person.id] === role ? "checked" : ""
                      } ${isCurrentUser ? "disabled-role" : ""}`}
                    >
                      {role}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="roles-footer"></div>
    </div>
  );
};

export default Settings;
