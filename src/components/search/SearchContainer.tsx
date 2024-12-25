import React, { useState } from "react";

import BasicSearch from "./BasicSearch";
import AdvancedSearch from "./AdvancedSearch";
import RadioInput from "./RadioInput";

import "../../sass/layout/_aside.scss";

const SearchContainer: React.FC = () => {
  const [isBasicSearch, setIsBasicSearch] = useState(true);

  return (
    <aside>
      <div>
      <RadioInput
          id="basic"
          label="Basic Search"
          checked={isBasicSearch}
          onChange={(value) => setIsBasicSearch(value)}
        />
        <RadioInput
          id="advanced"
          label="Advanced Search"
          checked={!isBasicSearch}
          onChange={(value) => setIsBasicSearch(!value)}
          className="advanced-label"
        />
      </div>

      <div className="content">
        {isBasicSearch ? <BasicSearch /> : <AdvancedSearch />}
      </div>
    </aside>
  );
};

export default SearchContainer;
