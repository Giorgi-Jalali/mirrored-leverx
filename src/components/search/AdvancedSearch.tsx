import React, { useState, useEffect } from "react";
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
  const { search_query, email, phone, skype, building, room, department } =
    useSelector((state: RootState) => state.advancedSearch);

  const [formState, setFormState] = useState({
    search_query,
    email,
    phone,
    skype,
    building,
    room,
    department,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    if (value.trim() === "") {
      dispatch(updateSearchField({ field, value: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allFieldsEmpty =
      !formState.search_query.trim() &&
      !formState.email.trim() &&
      !formState.phone.trim() &&
      !formState.skype.trim() &&
      !formState.building.trim() &&
      !formState.room.trim() &&
      !formState.department.trim();

    if (allFieldsEmpty) {
      resetFields();
    } else {
      const fields = {
        search_query: formState.search_query.trim(),
        email: formState.email.trim(),
        phone: formState.phone.trim(),
        skype: formState.skype.trim(),
        building: formState.building.trim(),
        room: formState.room.trim(),
        department: formState.department.trim(),
      };

      Object.entries(fields).forEach(([field, value]) => {
        if (value) {
          dispatch(updateSearchField({ field, value }));
        }
      });
    }
  };

  const resetFields = () => {
    const resetForm = {
      search_query: "",
      email: "",
      phone: "",
      skype: "",
      building: "",
      room: "",
      department: "",
    };

    setFormState(resetForm);
    Object.keys(resetForm).forEach((field) => {
      dispatch(updateSearchField({ field, value: "" }));
    });
  };

  useEffect(() => {
    setFormState({
      search_query,
      email,
      phone,
      skype,
      building,
      room,
      department,
    });
  }, [search_query, email, phone, skype, building, room, department]);

  return (
    <div className="advanced-content">
      <form onSubmit={handleSubmit}>
        <Input
          id={OPTION_NAME}
          name={OPTION_NAME}
          label="Name"
          placeholder={PLACEHOLDER_NAME}
          value={formState.search_query}
          onChange={(value) => handleInputChange("search_query", value)}
        />
        <Input
          id={OPTION_EMAIL}
          name={OPTION_EMAIL}
          label="Email"
          type="email"
          placeholder={PLACEHOLDER_EMAIL}
          value={formState.email}
          onChange={(value) => handleInputChange("email", value)}
        />
        <Input
          id={OPTION_PHONE}
          name={OPTION_PHONE}
          label="Phone"
          type="tel"
          placeholder={PLACEHOLDER_PHONE}
          value={formState.phone}
          onChange={(value) => handleInputChange("phone", value)}
        />
        <Input
          id={OPTION_SKYPE}
          name={OPTION_SKYPE}
          label="Skype"
          placeholder={PLACEHOLDER_SKYPE}
          value={formState.skype}
          onChange={(value) => handleInputChange("skype", value)}
        />
        <SearchSelect
          id={OPTION_BUILDING}
          name={OPTION_BUILDING}
          label="Building"
          value={formState.building}
          options={[
            { value: "", label: "Any" },
            { value: BUILDING_65, label: BUILDING_65 },
            { value: BUILDING_66, label: BUILDING_66 },
            { value: BUILDING_67, label: BUILDING_67 },
            { value: BUILDING_68, label: BUILDING_68 },
            { value: BUILDING_69, label: BUILDING_69 },
            { value: BUILDING_70, label: BUILDING_70 },
          ]}
          onChange={(value) => handleInputChange("building", value)}
        />
        <Input
          id={OPTION_ROOM}
          name={OPTION_ROOM}
          label="Room"
          placeholder={PLACEHOLDER_ROOM}
          value={formState.room}
          onChange={(value) => handleInputChange("room", value)}
        />
        <SearchSelect
          id={OPTION_DEPARTMENT}
          name={OPTION_DEPARTMENT}
          label="Department"
          value={formState.department}
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
          onChange={(value) => handleInputChange("department", value)}
        />
        <Button type="submit" text={PLACEHOLDER_SEARCH} />
      </form>
    </div>
  );
};

export default AdvancedSearch;
