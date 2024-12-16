import React from "react";

import "../../sass/pages/_user.scss";

import earth from "/public/assets/earth.png";
import v from "/public/assets/v.png";
import validity from "/public/assets/validity.png";

interface Visa {
  type: string;
  issuing_country: string;
  start_date: number;
  end_date: number;
}

interface InfoContainerProps {
  editMode: boolean;
  updatedUser: IUser | null;
  handleSaveClick: () => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleEditClick: () => void;
}

interface Employee {
  citizenship: string;
  visa?: Visa[];
}

interface IManager {
    id: string;
    first_name: string;
    last_name: string;
  }
  
  interface IUser {
    visa?: Visa[];
    id: string;
    password: string;
    passwordHash: string;
    role: string;
    first_name: string;
    last_name: string;
    user_avatar: string;
    first_native_name: string;
    last_native_name: string;
    middle_native_name: string;
    department: string;
    building: string;
    room: string;
    desk_number: string;
    date_birth: { day: number; month: number; year: number };
    manager: IManager;
    phone: string;
    email: string;
    skype: string;
    cnumber: string;
    citizenship: string;
  }

const InfoContainer: React.FC<InfoContainerProps> = ({
  updatedUser,
  editMode,
  handleSaveClick,
  handleInputChange,
  handleEditClick,
}) => {
  const renderVisaInfo = (updatedUser: IUser | null) => {
    const visaArray = updatedUser?.visa || [];
    return (
      <>
        <input
          type="text"
          value={updatedUser?.citizenship || ""}
          id="citizenship"
          onChange={handleInputChange}
          disabled={!editMode}
        />
        {visaArray.map((visa, index) => {
          const formattedDateRange = formatDateRange(
            visa.start_date,
            visa.end_date
          );
          return (
            <div key={index}>
              <p>
                {visa.type} ({visa.issuing_country})
              </p>
              <input
                type="date"
                onChange={handleInputChange}
                value={formattedDateRange}
                id={`date-${index}`}
                disabled={!editMode}
              />
              <p>{formattedDateRange}</p>
            </div>
          );
        })}
      </>
    );
  };

  const renderVisaList = (updatedUser: IUser | null) => {
    const visaArray = updatedUser?.visa || [];
    return (
      <>
        <div className="info-list">
          <img src={earth} alt="citizenship icon" width="20px" height="20px" />
          <p>Citizenship</p>
        </div>
        {visaArray.map((visa, index) => {
          const visaNumber = `Visa ${index + 1}`;
          const validityText = formatDateRange(visa.start_date, visa.end_date);
          return (
            <React.Fragment key={index}>
              <div className="info-list">
                <img src={v} alt="visa icon" width="20px" height="20px" />
                <p>{visaNumber}</p>
              </div>
              <div className="info-list">
                <img
                  src={validity}
                  alt="validity icon"
                  width="20px"
                  height="20px"
                />
                <p>{validityText}</p>
              </div>
            </React.Fragment>
          );
        })}
      </>
    );
  };

  const formatDateRange = (
    startTimestamp: number,
    endTimestamp: number
  ): string => {
    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const startFormatted = startDate.toLocaleDateString("en-GB", options);
    const endFormatted = endDate.toLocaleDateString("en-GB", options);

    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <>
      <div className="info-left-citizenship">{renderVisaList(updatedUser)}</div>
      <div className="info-right">{renderVisaInfo(updatedUser)}</div>
    </>
  );
};

export default InfoContainer;
