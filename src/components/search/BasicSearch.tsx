import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { updateSearchField } from "../../redux/slices/advancedSearchSlice";

import SearchForm from "./SearchForm";
import { PLACEHOLDER_NAME } from "../../constants/constants";
import "../../sass/components/searchContainer/_basic-search.scss";

const BasicSearch: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (value: string) => {
    setSearchInput(value);

    if (value.trim() === "") {
      dispatch(updateSearchField({ field: "search_query", value: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      dispatch(
        updateSearchField({ field: "search_query", value: searchInput.trim() })
      );
    }
  };

  useEffect(() => {
    if (searchInput.trim() === "") {
      dispatch(updateSearchField({ field: "search_query", value: "" }));
    }
  }, [searchInput, dispatch]);

  return (
    <div className="basic-content">
      <SearchForm
        value={searchInput}
        handleInputChange={handleInputChange}
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
