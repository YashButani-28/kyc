export default function ActionButton({
  children,
  type = "submit",
  className = "",
  variant = "default",
  ...props
}) {
  const colorClasses = {
    lightGray: "bg-[#E2E2E2] text-[#06031C] hover:bg-[#dedcdc]",
    primary: "bg-[#6B5DC7] text-white hover:bg-[#6356b4]",
    gray: "bg-[#BEBEBE] text-[#06031C] hover:bg-[#a6a6a6]",
    darkGray: "bg-[#696774] text-white hover:bg-[#575560]",
    black: "bg-black text-white hover:bg-[#3d3d3d]",
  };
  return (
    <button
      type={type}
      className={`${
        colorClasses[variant] || colorClasses.default
      } ${className} rounded-[10px] text-center text-[14px] py-[10px] px-[18px] h-[38px] w-[124px] transition duration-300 ease-in-out`}
      {...props}
    >
      {children}
    </button>
  );
}
