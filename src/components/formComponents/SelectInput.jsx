import React, { forwardRef } from "react";

const SelectInput = forwardRef(
  (
    { options, important, value, onChange, label, placeholder, className = "" },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className=" block text-gray-700 text-sm font-bold mb-2 ml-[5px]">
            {label}
            {important && <span className="text-red-500">*</span>}
          </label>
        )}
        <select
          value={value}
          onChange={onChange}
          ref={ref}
          className={`w-full px-[12px] py-[8px] p-2 rounded-[6px] border border-[#69677480] ${className}`}
        >
          <option value="" className="bg-gray-400">
            {placeholder || ""}
          </option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
export default React.memo(SelectInput);
