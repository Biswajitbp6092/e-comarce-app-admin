import React from "react";

const ProgressBar = ({ value, type }) => {
  const typeColor =
    type === "success"
      ? "bg-green-700"
      : type === "error"
      ? "bg-pink-700"
      : type === "warning"
      ? "bg-orange-400"
      : ""; 

  return (
    <div className="w-[100px] h-auto overflow-hidden rounded-md bg-[#f1f1f1]">
      <span
        style={{ width: `${value}%` }}
        className={`flex h-[8px] ${typeColor}`}
      ></span>
    </div>
  );
};

export default ProgressBar;
