import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../redux/store";
import { updateSearchField } from "../../redux/slices/advancedSearchSlice";

import "../../sass/components/searchContainer/_basic-search.scss";

import SearchForm from "./SearchForm";
import { OPTION_NAME, PLACEHOLDER_NAME } from "../../constants/constants";

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
      <SearchForm
        value={name}
        handleInputChange={(value) => handleInputChange(OPTION_NAME, value)}
        onSubmit={handleSubmit}
        className="search-input-basic"
        placeholder={PLACEHOLDER_NAME}
        button={true}
        imgClassname="search"
      />
    </div>
  );
};

export default BasicSearch;
