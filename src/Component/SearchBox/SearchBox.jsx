import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBox = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchInput = useRef();

  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);
    props.setSearchQuery(e.target.value);
    if (searchInput.current.value === "") {
      console.log("a");
      props.setPageOrder(1);
    }
  };
  return (
    <div className="w-full h-auto bg-[#f1f1f1] relative overflow-hidden">
      <IoSearch className="absolute top-[10px] left-[10px] z-50 pointer-events-none opacity-50" />
      <input
        type="text"
        placeholder="Search here..."
        className="w-full h-[36px] border border-[rgba(0,0,0,0.1)] !py-1 bg-[#f1f1f1] pl-8 focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md text-xs md:text-sm"
        value={searchQuery}
        ref={searchInput}
        onChange={onChangeInput}
      />
    </div>
  );
};

export default SearchBox;
