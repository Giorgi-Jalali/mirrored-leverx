import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { updateSearchField } from "../../redux/slices/advancedSearchSlice";
import Input from "../input/Input";
import SearchSelect from "./SearchSelect";
import Button from "../button/Button";

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
          id="name"
          name="name"
          label="Name"
          placeholder="John Smith"
          value={name}
          onChange={(value) => handleInputChange("name", value)}
        />
        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="johnsmith@leverx.com"
          value={email}
          onChange={(value) => handleInputChange("email", value)}
        />
        <Input
          id="phone"
          name="phone"
          label="Phone"
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(value) => handleInputChange("phone", value)}
        />
        <Input
          id="skype"
          name="skype"
          label="Skype"
          placeholder="SkypeID"
          value={skype}
          onChange={(value) => handleInputChange("skype", value)}
        />
        <SearchSelect
          id="building"
          name="building"
          label="Building"
          value={building}
          options={[
            { value: "", label: "Any" },
            { value: "Pilsudskiego 65 (Poland)", label: "Pilsudskiego 65 (Poland)" },
            { value: "Pilsudskiego 66 (Poland)", label: "Pilsudskiego 66 (Poland)" },
            { value: "Pilsudskiego 67 (Poland)", label: "Pilsudskiego 67 (Poland)" },
            { value: "Pilsudskiego 68 (Poland)", label: "Pilsudskiego 68 (Poland)" },
            { value: "Pilsudskiego 69 (Poland)", label: "Pilsudskiego 69 (Poland)" },
            { value: "Pilsudskiego 70 (Poland)", label: "Pilsudskiego 70 (Poland)" },
          ]}
          onChange={(value) => handleInputChange("building", value)}
        />
        <Input
          id="room"
          name="room"
          label="Room"
          placeholder="303.1"
          value={room}
          onChange={(value) => handleInputChange("room", value)}
        />
        <SearchSelect
          id="department"
          name="department"
          label="Department"
          value={department}
          options={[
            { value: "", label: "Any" },
            { value: "Web & Mobile", label: "Web & Mobile" },
            { value: "Cybersecurity & Compliance", label: "Cybersecurity & Compliance" },
            { value: "UI/UX Design", label: "UI/UX Design" },
            { value: "Backend & Integration", label: "Backend & Integration" },
            { value: "AI & Data Science", label: "AI & Data Science" },
            { value: "Cloud & DevOps", label: "Cloud & DevOps" },
          ]}
          onChange={(value) => handleInputChange("department", value)}
        />
        <Button type="submit" text="Search" />
      </form>
    </div>
  );
};

export default AdvancedSearch;
