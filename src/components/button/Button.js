import React from "react";

const Button = ({
  onClick,
  className = "",
  children,
  full = false,
  type = "button",
  bgColor = "primary",
  ...props
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    case "danger":
      bgClassName = "bg-danger";
      break;
    default:
      bgClassName = "bg-primary";
      break;
  }
  return (
    <button
      onClick={onClick}
      className={`w-auto px-6 py-3 mt-auto capitalize rounded-lg ${
        full ? "w-full" : ""
      } ${bgClassName} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
