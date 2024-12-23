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
  
      // Handle date_birth case
      if (id === "date_birth" && value) {
        const [year, month, day] = value.split("-");
        setUpdatedUser({
          ...updatedUser,
          [id]: { year: parseInt(year, 10), month: parseInt(month, 10), day: parseInt(day, 10) },
        });
        return;
      }
  
      // Handle visa date updates
      const idParts = id.split("-");
      if (idParts[0] === "start" || idParts[0] === "end") {
        const visaIndex = parseInt(idParts[2], 10); // Extract the visa index
        const field = `${idParts[0]}_date`; // Determine whether it's start_date or end_date
  
        const updatedVisa = updatedUser?.visa?.map((visa, index) =>
          index === visaIndex
            ? {
                ...visa,
                [field]: new Date(value).getTime(), // Convert the input value to timestamp
              }
            : visa
        );
  
        setUpdatedUser({
          ...updatedUser,
          visa: updatedVisa,
        });
        return;
      }
  
      // Fallback for other fields
      setUpdatedUser({
        ...updatedUser,
        [id]: value,
      });
    }
  };
  

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   if (updatedUser) {
  //     const { id, value } = e.target;
  
  //     if (id === 'date_birth' && value) {
  //       const [year, month, day] = value.split('-');
  //       setUpdatedUser({
  //         ...updatedUser,
  //         [id]: { year: parseInt(year), month: parseInt(month), day: parseInt(day) },
  //       });
  //     } else {
  //       setUpdatedUser({
  //         ...updatedUser,
  //         [id]: value,
  //       });
  //     }
  //   }
  // };
  

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
