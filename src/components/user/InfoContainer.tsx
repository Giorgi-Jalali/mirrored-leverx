import React from "react";

import earth from "/public/assets/earth.png";
import v from "/public/assets/v.png";
import validity from "/public/assets/validity.png";

import { IEmployee } from "../../types/EmployeeTypes";
import InfoInput from "./InfoInput";
import { formatDateRange } from "../../utils/formatDateRange";

import "../../sass/pages/_user.scss";

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
        <InfoInput
          id="citizenship"
          value={updatedUser?.citizenship || ""}
          onChange={handleInputChange}
          disabled={!editMode}
        />
        {visaArray.map((visa, index) => {
          const startFormatted = new Date(visa.start_date)
            .toISOString()
            .split("T")[0];
          const endFormatted = new Date(visa.end_date)
            .toISOString()
            .split("T")[0];

          return (
            <div key={index} className="info-right">
              <div className="date-inputs">
                <input
                  type="text"
                  id={`visa-type-${index}`}
                  value={`${visa.type}`}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
                <input
                  type="text"
                  id={`visa-issuing_country-${index}`}
                  value={`(${visa.issuing_country})`}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </div>

              <div className="date-inputs">
                <InfoInput
                  type="date"
                  id={`start-date-${index}`}
                  value={startFormatted}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
                <InfoInput
                  type="date"
                  id={`end-date-${index}`}
                  value={endFormatted}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </div>
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
          const validityText = formatDateRange(visa.start_date, visa.end_date);
          return (
            <React.Fragment key={index}>
              <div className="info-list">
                <img src={v} alt="visa icon" width="20px" height="20px" />
                <p>Visa {index + 1}</p>
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

  return (
    <>
      <div className="info-left">{renderVisaList(updatedUser)}</div>
      <div className="info-right">{renderVisaInfo(updatedUser)}</div>
    </>
  );
};

export default InfoContainer;
