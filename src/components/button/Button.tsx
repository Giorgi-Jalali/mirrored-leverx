import React from "react";

interface IButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
  className?: string;
  id?: string;
}

const Button: React.FC<IButtonProps> = ({ type, text, onClick, className, id }) => {
  return (
    <button type={type} onClick={onClick} className={className} id={id}>
      {text}
    </button>
  );
};

export default Button;
