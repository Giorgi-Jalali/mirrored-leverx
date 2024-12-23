import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../services/userApi";
import "../sass/pages/_user.scss";

import { IEmployee } from "../types/EmployeeTypes";
import { useSnackbar } from "../hooks/useSnackbar";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/button/Button";
import GeneralInfo from "../components/user/GeneralInfo";
import Contacts from "../components/user/Contacts";
import TravelInfo from "../components/user/TravelInfo";
import UserAside from "../components/user/UserAside";
import { employeeApi } from "../services/employeeApi";

const User: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<IEmployee | null>(null);

  const dispatch = useDispatch<AppDispatch>();


  const { data: user, isError, refetch } = useGetUserByIdQuery(id || "");
  const [updateUser] = useUpdateUserMutation();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    }
  }, [user]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (updatedUser) {
      const { id, value } = e.target;
      setUpdatedUser({ ...updatedUser, [id]: value });
    }
  };

  const handleSaveClick = async () => {
    if (updatedUser) {
      try {
        await updateUser(updatedUser).unwrap();
        showSnackbar("User information updated successfully!");
        setEditMode(false);
        dispatch(employeeApi.util.invalidateTags([{ type: "Employee" }]));
        refetch();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  if (isError) {
    navigate("/not-found");
    return null;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-main">
      <UserAside
        updatedUser={updatedUser}
        handleInputChange={handleInputChange}
        editMode={editMode}
        user={user}
        currentUser={currentUser}
        handleEditClick={handleEditClick}
      />
      <div className="user-section">
        <GeneralInfo
          updatedUser={updatedUser}
          handleInputChange={handleInputChange}
          editMode={editMode}
          user={user}
        />

        <Contacts
          updatedUser={updatedUser}
          handleInputChange={handleInputChange}
          editMode={editMode}
        />
        <TravelInfo
          updatedUser={updatedUser}
          handleInputChange={handleInputChange}
          editMode={editMode}
        />
        {currentUser?.role === "admin" ||
        (currentUser?.role === "hr" && user?.manager?.id == currentUser?.id) ? (
          <Button onClick={handleSaveClick} text="Save" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default User;
