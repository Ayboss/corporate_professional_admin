"use client";
import { EyeOffIcon, EyeOnIcon } from "@/imagecomponents";
import { InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";

type CPInputType = {
  type?: "textarea" | "text" | "password" | "email" | "date";
  placeholder?: string;
  className?: string;
  error?: string;
};

// Create intersection types for input and textarea
type InputProps = CPInputType &
  Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className">;
type TextareaProps = CPInputType &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;

// Union type for the component props
type CPInputProps = InputProps | TextareaProps;

function CPInput({
  type = "text",
  placeholder = "Email Address",
  className = "",
  error = "",
  ...props
}: CPInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  if (type === "textarea") {
    return (
      <>
        <textarea
          placeholder={placeholder}
          className={`block mb-2 py-[14px] px-[16px] w-full bg-[#F8FAFC] rounded-[8px] ${className}`}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
        {error && (
          <p className="text-[#E62E2E] text-sm -translate-1.5 mb-0">{error}</p>
        )}
      </>
    );
  }
  if (type === "password") {
    return (
      <>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className={`block mb-2 py-[14px] px-[16px] w-full bg-[#F8FAFC] rounded-[8px] ${className}`}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeOnIcon />}
          </button>
        </div>
        {error && (
          <p className="text-[#E62E2E] text-sm -translate-1.5 mb-0">{error}</p>
        )}
      </>
    );
  }
  return (
    <>
      <input
        type={type as "text" | "email" | "date"}
        placeholder={placeholder}
        className={`block mb-2 py-[14px] px-[16px] w-full bg-[#F8FAFC] rounded-[8px] ${className}`}
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
      />
      {error && (
        <p className="text-[#E62E2E] text-sm -translate-1.5 mb-0">{error}</p>
      )}
    </>
  );
}

export default CPInput;
