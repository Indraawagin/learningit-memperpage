import React from "react";
import propTypes from "prop-types";

export default function Input({
  error,
  name,
  value,
  labelName,
  onChange,
  type,
  inpuClassname,
  placeholder,
}) {
  return (
    <div className="flex flex-col mb-4">
      {labelName && (
        <label
          htmlFor={name}
          className={[
            "text-lg mb-2",
            error ? "text-red-500" : "text-gray-900",
          ].join(" ")}
        >
          {labelName}
        </label>
      )}
      <input
        name={name}
        type={type}
        onChange={onChange}
        className={[
          "bg-white focus:outline-none px-6 py-3 w-full",
          error
            ? "border-red-500 border"
            : " focus:border-teal-500 border-gray-600 border text-gray-600",
          inpuClassname,
        ].join(" ")}
        value={value}
        placeholder={placeholder}
        autoComplete="on"
      />
      <span className="text-red-500 pt-2">{error}</span>
    </div>
  );
}

Input.propTypes = {
  name: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  onChange: propTypes.func.isRequired,
  error: propTypes.string,
  labelName: propTypes.string,
  inpuClassname: propTypes.string,
  placeholder: propTypes.string,
  type: propTypes.oneOf(["text", "email", "password"]),
};
