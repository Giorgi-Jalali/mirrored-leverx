import React from "react";

import "../../sass/pages/_user.scss";

import earth from "/public/assets/earth.png";
import v from "/public/assets/v.png";
import validity from "/public/assets/validity.png";
import { IEmployee } from "../../types/EmployeeTypes";

interface IInfoContainerProps {
  updatedUser: IEmployee | null;
  editMode: boolean;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const InfoContainer: React.FC<IInfoContainerProps> = ({
  updatedUser,
  editMode,
  handleInputChange,
}) => {
  const renderVisaInfo = (updatedUser: IEmployee | null) => {
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

  const renderVisaList = (updatedUser: IEmployee | null) => {
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
