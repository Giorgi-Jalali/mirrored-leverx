import React from "react";

interface RadioInputProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

const RadioInput: React.FC<RadioInputProps> = ({
  id,
  label,
  checked,
  onChange,
  className
}) => {
  return (
    <>
      <input
        type="radio"
        id={id}
        name="toggle"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <label htmlFor={id} id={`${id}-label`} className={className}>
        {label}
      </label>
    </>
  );
};

export default RadioInput;
