import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import "../../sass/components/searchContainer/_advanced-search.scss";
import { updateSearchField } from "../../redux/slices/advancedSearchSlice";

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
        <label htmlFor="name" className="label-class">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John Smith"
          value={name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />

        <label htmlFor="email" className="label-class">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="johnsmith@leverx.com"
          value={email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />

        <label htmlFor="phone" className="label-class">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />

        <label htmlFor="skype" className="label-class">
          Skype
        </label>
        <input
          type="text"
          id="skype"
          name="skype"
          placeholder="SkypeID"
          value={skype}
          onChange={(e) => handleInputChange("skype", e.target.value)}
        />

        <label htmlFor="building" className="label-class">
          Building
        </label>
        <select
          id="building"
          name="building"
          value={building}
          onChange={(e) => handleInputChange("building", e.target.value)}
        >
          <option value="">Any</option>
          <option value="Pilsudskiego 65 (Poland)">
            Pilsudskiego 65 (Poland)
          </option>
          <option value="Pilsudskiego 66 (Poland)">
            Pilsudskiego 66 (Poland)
          </option>
          <option value="Pilsudskiego 67 (Poland)">
            Pilsudskiego 67 (Poland)
          </option>
          <option value="Pilsudskiego 68 (Poland)">
            Pilsudskiego 68 (Poland)
          </option>
          <option value="Pilsudskiego 69 (Poland)">
            Pilsudskiego 69 (Poland)
          </option>
          <option value="Pilsudskiego 70 (Poland)">
            Pilsudskiego 70 (Poland)
          </option>
        </select>

        <label htmlFor="room" className="label-class">
          Room
        </label>
        <input
          type="text"
          id="room"
          name="room"
          placeholder="303.1"
          value={room}
          onChange={(e) => handleInputChange("room", e.target.value)}
        />

        <label htmlFor="department" className="label-class">
          Department
        </label>
        <select
          id="department"
          name="department"
          value={department}
          onChange={(e) => handleInputChange("department", e.target.value)}
        >
          <option value="">Any</option>
          <option value="Web & Mobile">Web & Mobile</option>
          <option value="Cybersecurity & Compliance">
            Cybersecurity & Compliance
          </option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Backend & Integration">Backend & Integration</option>
          <option value="AI & Data Science">AI & Data Science</option>
          <option value="Cloud & DevOps">Cloud & DevOps</option>
        </select>

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default AdvancedSearch;
