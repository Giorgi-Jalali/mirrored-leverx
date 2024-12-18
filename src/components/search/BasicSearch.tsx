import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateSearchQuery } from "../../redux/slices/search/searchSlice";

import "../../sass/components/searchContainer/_basic-search.scss";

import searchIcon from "/public/assets/search.png";

const BasicSearch: React.FC = () => {
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const dispatch = useDispatch();

  const handleSearch = (query: string) => {
    dispatch(updateSearchQuery(query));
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
      <form
        action="./404.html"
        method="GET"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchQuery);
        }}
      >
        <input
          type="text"
          className="search-input"
          placeholder="John Smith"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default BasicSearch;
