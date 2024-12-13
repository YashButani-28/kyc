import { forwardRef, useRef } from "react";

function Input(
  {
    label,
    important,
    type = "text",
    name,
    value,
    onChange,
    className = "",
    ...props
  },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2 ml-[5px]">
          {label}
          {important && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        ref={ref}
        onChange={onChange}
        className={`w-full px-[12px] py-[8px] border border-[#69677480] placeholder-[#696774] rounded-[6px]  focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
