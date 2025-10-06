import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdDashboard } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { CgProductHunt } from "react-icons/cg";
import { TbCategory } from "react-icons/tb";
import { IoBagCheck } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Collapse } from "react-collapse";
import { myContext } from "../../App";
import Modal from "@mui/material/Modal";

const Sidebar = () => {
  const [subMenuIndex, setSubMenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(null);
    } else {
      setSubMenuIndex(index);
    }
  };

  const context = useContext(myContext);

  return (
    <>
      <div
        className={`sidebar fixed top-0 left-0 bg-[#fff] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4 
          w-[${context.isSidebarOpen === true ? "18%" : "0px"}]`}
      >
        <div className="py-2 w-full">
          <Link to="/">
            <img src="/logo.jpg" alt="" className="w-[180px]" />
          </Link>
        </div>

        <ul className="mt-4">
          <li>
            <Link to="/">
              <Button className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#262626]">
                <MdDashboard size={18} />
                <span>Dashboard</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              onClick={() => isOpenSubMenu(1)}
              className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#262626]"
            >
              <FaRegImage size={18} />
              <span>Home Slides</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                <IoIosArrowDown
                  size={18}
                  className={`transition-all ${
                    subMenuIndex === 1 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={subMenuIndex === 1 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/homeslider/list">
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                    <span className="w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Home Banner List
                  </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button onClick={()=>context.setIsOppenFullScreenPanel({open:true, model:'Add Home Slider'})} className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                    <span className="w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Home Banner Slide
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Link to="/users">
              <Button className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#262626]">
                <LuUsers size={18} />
                <span>Users</span>
              </Button>
            </Link>
          </li>

          <li>
            <Button
              onClick={() => isOpenSubMenu(3)}
              className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#262626]"
            >
              <CgProductHunt size={18} />
              <span>Products</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                <IoIosArrowDown
                  size={18}
                  className={`transition-all ${
                    subMenuIndex === 3 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={subMenuIndex === 3 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/products">
                    <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Products List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    onClick={() =>
                      context.setIsOppenFullScreenPanel({
                        open: true,
                        model: "Add Product",
                      })
                    }
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3"
                  >
                    <span className="w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Products Upload
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Button
              onClick={() => isOpenSubMenu(4)}
              className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#262626]"
            >
              <TbCategory size={18} />
              <span>Category</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                <IoIosArrowDown
                  size={18}
                  className={`transition-all ${
                    subMenuIndex === 4 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={subMenuIndex === 4 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/category/list">
                    <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Category List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button onClick={()=>context.setIsOppenFullScreenPanel({open:true, model:'Add New Category'})} 
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3"
                  >
                    <span className="w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add a Category
                  </Button>
                </li>
                <li className="w-full">
                  <Link to="/subcategory/list">
                    <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Sub Category List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
           
                    <Button onClick={()=>context.setIsOppenFullScreenPanel({open:true, model:'Add New Sub Category'})} className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Add a Sub Category
                    </Button>
                
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Link to="/orders">
            <Button className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#262626]">
              <IoBagCheck size={18} />
              <span>Orders</span>
            </Button>
            </Link>
          </li>

          <li>
            <Button className="w-full !capitalize !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg[#262626]">
              <MdLogout size={18} />
              <span>Logout</span>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
