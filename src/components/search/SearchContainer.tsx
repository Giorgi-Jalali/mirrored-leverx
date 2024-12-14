import React, { useState } from "react";


import "../../sass/layout/_aside.scss";


import BasicSearch from "./BasicSearch";
import AdvancedSearch from "./AdvancedSearch";

interface SearchContainerProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  searchQuery,
  handleSearch,
}) => {
  const [isBasicSearch, setIsBasicSearch] = useState(true);

  return (
    <aside>
      <div>
        <input
          type="radio"
          id="basic"
          name="toggle"
          checked={isBasicSearch}
          onChange={() => setIsBasicSearch(true)}
        />
        <label htmlFor="basic" id="basic-label">
          Basic Search
        </label>

        <input
          type="radio"
          id="advanced"
          name="toggle"
          checked={!isBasicSearch}
          onChange={() => setIsBasicSearch(false)}
        />
        <label
          htmlFor="advanced"
          id="advanced-label"
          className="advanced-label"
        >
          Advanced Search
        </label>
      </div>

      <div className="content">
        {isBasicSearch && (
          <BasicSearch searchQuery={searchQuery} handleSearch={handleSearch} />
        )}

        {!isBasicSearch && <AdvancedSearch />}
      </div>
    </aside>
  );
};

export default SearchContainer;
