export default function DetailTitle({
  title,
  codeName = "",
  code = "",
  className = "",
}) {
  return (
    <div className="w-full title flex flex-col gap-2">
      <div className="text-[20px] font-semibold">
        <h1>{title}</h1>
      </div>

      <div className="flex gap-2 items-center">
        {codeName && <p className={`text-[14px] ${className}`}>{codeName}</p>}
        {code && (
          <span className="text-[14px] px-[12px] py-[4px] text-white bg-primary rounded-md">
            {code}
          </span>
        )}
      </div>
    </div>
  );
}
