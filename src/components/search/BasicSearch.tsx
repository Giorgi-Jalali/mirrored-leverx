import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateSearchField } from "../../redux/slices/advancedSearchSlice";

import "../../sass/components/searchContainer/_basic-search.scss";

import searchIcon from "/public/assets/search.png";

const BasicSearch: React.FC = () => {
  const { name } = useSelector((state: RootState) => state.advancedSearch);
  const dispatch = useDispatch();

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateSearchField({ field, value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="basic-content">
      <img
        src={searchIcon}
        alt="search icon"
        width="20px"
        height="20px"
        className="search"
      />
      <form action="./404.html" method="GET" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="John Smith"
          value={name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default BasicSearch;
