import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { updateSearchField } from "../../redux/slices/advancedSearchSlice";
import Input from "../input/Input";
import SearchSelect from "./SearchSelect";
import Button from "../button/Button";

import {
  BUILDING_65,
  BUILDING_66,
  BUILDING_67,
  BUILDING_68,
  BUILDING_69,
  BUILDING_70,
  DEP_AI_DATA_SCIENCE,
  DEP_BACKEND_INTEGRATION,
  DEP_CLOUD_DEVOPS,
  DEP_CYBERSECURITY_COMPLIANCE,
  DEP_UI_UX_DESIGN,
  DEP_WEB_MOBILE,
  OPTION_BUILDING,
  OPTION_DEPARTMENT,
  OPTION_EMAIL,
  OPTION_NAME,
  OPTION_PHONE,
  OPTION_ROOM,
  OPTION_SKYPE,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_NAME,
  PLACEHOLDER_PHONE,
  PLACEHOLDER_ROOM,
  PLACEHOLDER_SEARCH,
  PLACEHOLDER_SKYPE,
} from "../../constants/constants";
import "../../sass/components/searchContainer/_advanced-search.scss";

const AdvancedSearch: React.FC = () => {
  const dispatch = useDispatch();

  const { name, email, phone, skype, building, room, department } = useSelector(
    (state: RootState) => state.advancedSearch
  );

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateSearchField({ field, value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="advanced-content">
      <form onSubmit={handleSubmit}>
        <Input
          id={OPTION_NAME}
          name={OPTION_NAME}
          label="Name"
          placeholder={PLACEHOLDER_NAME}
          value={name}
          onChange={(value) => handleInputChange(OPTION_NAME, value)}
        />
        <Input
          id={OPTION_EMAIL}
          name={OPTION_EMAIL}
          label="Email"
          type="email"
          placeholder={PLACEHOLDER_EMAIL}
          value={email}
          onChange={(value) => handleInputChange(OPTION_EMAIL, value)}
        />
        <Input
          id={OPTION_PHONE}
          name={OPTION_PHONE}
          label="Phone"
          type="tel"
          placeholder={PLACEHOLDER_PHONE}
          value={phone}
          onChange={(value) => handleInputChange(OPTION_PHONE, value)}
        />
        <Input
          id={OPTION_SKYPE}
          name={OPTION_SKYPE}
          label="Skype"
          placeholder={PLACEHOLDER_SKYPE}
          value={skype}
          onChange={(value) => handleInputChange(OPTION_SKYPE, value)}
        />
        <SearchSelect
          id={OPTION_BUILDING}
          name={OPTION_BUILDING}
          label="Building"
          value={building}
          options={[
            { value: "", label: "Any" },
            {
              value: BUILDING_65,
              label: BUILDING_65,
            },
            {
              value: BUILDING_66,
              label: BUILDING_66,
            },
            {
              value: BUILDING_67,
              label: BUILDING_67,
            },
            {
              value: BUILDING_68,
              label: BUILDING_68,
            },
            {
              value: BUILDING_69,
              label: BUILDING_69,
            },
            {
              value: BUILDING_70,
              label: BUILDING_70,
            },
          ]}
          onChange={(value) => handleInputChange(OPTION_BUILDING, value)}
        />
        <Input
          id={OPTION_ROOM}
          name={OPTION_ROOM}
          label="Room"
          placeholder={PLACEHOLDER_ROOM}
          value={room}
          onChange={(value) => handleInputChange(OPTION_ROOM, value)}
        />
        <SearchSelect
          id={OPTION_DEPARTMENT}
          name={OPTION_DEPARTMENT}
          label="Department"
          value={department}
          options={[
            { value: "", label: "Any" },
            { value: DEP_WEB_MOBILE, label: DEP_WEB_MOBILE },
            {
              value: DEP_CYBERSECURITY_COMPLIANCE,
              label: DEP_CYBERSECURITY_COMPLIANCE,
            },
            { value: DEP_UI_UX_DESIGN, label: DEP_UI_UX_DESIGN },
            { value: DEP_BACKEND_INTEGRATION, label: DEP_BACKEND_INTEGRATION },
            { value: DEP_AI_DATA_SCIENCE, label: DEP_AI_DATA_SCIENCE },
            { value: DEP_CLOUD_DEVOPS, label: DEP_CLOUD_DEVOPS },
          ]}
          onChange={(value) => handleInputChange(OPTION_DEPARTMENT, value)}
        />
        <Button type="submit" text={PLACEHOLDER_SEARCH} />
      </form>
    </div>
  );
};

export default AdvancedSearch;
