import React from "react";

interface SearchSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  id,
  name,
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="select-group">
      <label htmlFor={id} className="label-class">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchSelect;
