import React from "react";

import searchIcon from "/public/assets/search.png";

import Button from "../button/Button";
import Input from "../input/Input";
import { PLACEHOLDER_SEARCH } from "../../constants/constants";

interface ISearchFormProps {
  value: string;
  handleInputChange: (value: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  className: string;
  placeholder: string;
  button?: boolean;
  imgClassname: string;
}

const SearchForm: React.FC<ISearchFormProps> = ({
  value,
  handleInputChange,
  onSubmit,
  className,
  placeholder,
  button = false,
  imgClassname,
}) => {
  return (
    <>
      <img
        src={searchIcon}
        alt="search icon"
        width="20px"
        height="20px"
        className={imgClassname}
      />
      <form onSubmit={onSubmit}>
        <Input
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
        {button && <Button type="submit" text={PLACEHOLDER_SEARCH} />}
      </form>
    </>
  );
};

export default SearchForm;
