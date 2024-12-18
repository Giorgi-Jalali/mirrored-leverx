import React, { useState } from "react";


import "../../sass/layout/_aside.scss";


import BasicSearch from "./BasicSearch";
import AdvancedSearch from "./AdvancedSearch";

const SearchContainer: React.FC = () => {
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
          <BasicSearch />
        )}

        {!isBasicSearch && <AdvancedSearch />}
      </div>
    </aside>
  );
};

export default SearchContainer;
