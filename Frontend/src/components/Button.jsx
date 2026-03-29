import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}


function Button({
  children,
  onClick,
  disabled,
  icon,
  color = "primary",
  variant = "filled",
  rounded = "md",
  type = "button",
  className,
  loading,
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    filled: {
      primary: "bg-black text-white hover:bg-gray-800",
      secondary: "bg-gray-200 text-black hover:bg-gray-300",
    },
    outline: {
      primary: "border border-black text-black hover:bg-gray-50",
      secondary: "border border-gray-200 text-gray-700 hover:bg-gray-50",
    },
    ghost: {
      primary: "text-black hover:bg-gray-100",
      secondary: "text-gray-500 hover:bg-gray-100",
    }
  };

  const roundedStyles = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const variantClasses = variants[variant]?.[color] || variants.filled.primary;
  const roundedClasses = roundedStyles[rounded] || roundedStyles.md;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(baseStyles, variantClasses, roundedClasses, "px-4 py-2", className)}
      onClick={onClick}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;

