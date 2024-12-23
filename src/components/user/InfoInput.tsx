import React from "react";

interface IInfoInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled: boolean;
  type?: string;
  placeholder?: string;
}

const InfoInput: React.FC<IInfoInputProps> = ({
  id,
  value,
  onChange,
  disabled,
  type = "text",
  placeholder,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      id={id}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default InfoInput;
