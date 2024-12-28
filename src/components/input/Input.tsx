import React from "react";

interface IInputProps {
  id?: string;
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

const Input: React.FC<IInputProps> = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className,
}) => {

  return (
    <div className={className || "input-group"}>
      <label htmlFor={id} className="label-class">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
};

export default Input;
