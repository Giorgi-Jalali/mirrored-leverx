import React from "react";

import "../../sass/components/searchContainer/_basic-search.scss";

import searchIcon from "/src/assets/search.png";

interface IbasicSearchProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
}

const BasicSearch: React.FC<IbasicSearchProps> = ({
  searchQuery,
  handleSearch,
}) => {
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
