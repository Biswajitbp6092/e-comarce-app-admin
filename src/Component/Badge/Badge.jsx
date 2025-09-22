import React from "react";

const Badge = (props) => {
  return (
    <span
      className={`inline-block py-1 px-4  text-[12px] rounded-full capitalize 
        ${props.status === "Pending" && "bg-[#ff5252] text-white"}
        ${props.status === "Confrim" && "bg-green-400 text-white"}
        ${props.status === "Delivered" && "bg-green-800 text-white"}
        `}
        
    >
      {props.status}
    </span>
  );
};

export default Badge;
