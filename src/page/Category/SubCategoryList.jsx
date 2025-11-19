import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { myContext } from "../../App";
import { FaAngleDown } from "react-icons/fa";
import EditSubCatBox from "./EditSubCatBox";

const SubCategoryList = () => {
  const [isOpen, setIsOpen] = useState(0);
  const context = useContext(myContext);

  const expend = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };
  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-2">
        <h2 className="text-[18px] font-[600]">
          Sub Category List{" "}
          <span className="font-[400] text-[14px]">(MUI CSS Table)</span>
        </h2>
        <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
          <Button className="btn !bg-green-600 !text-white btn-sm">
            Export
          </Button>
          <Button
            onClick={() =>
              context.setIsOppenFullScreenPanel({
                open: true,
                model: "Add New Sub Category",
              })
            }
            className="btn-blue !text-white btn-sm"
          >
            Add New Sub Category
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 pb-5 px-5 shadow-md sm:rounded-lg bg-white">
        {context?.catData?.length !== 0 && (
          <ul className="w-full">
            {context?.catData?.map((firstLavelCat, index) => {
              return (
                <li className="w-full mb-2" key={index}>
                  <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                    <span className="font-[500] flex items-center gap-4 text-[14px]">
                      {firstLavelCat?.name}
                    </span>
                    <Button
                      className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto"
                      onClick={() => expend(index)}
                    >
                      <FaAngleDown />
                    </Button>
                  </div>
                  {isOpen === index && (
                    <>
                      {firstLavelCat?.children?.length !== 0 && (
                        <ul className="w-full">
                          {firstLavelCat?.children?.map((subCat, index_) => {
                            return (
                              <li className="w-full py-2" key={index_}>
                                <EditSubCatBox
                                  name={subCat?.name}
                                  id={subCat?._id}
                                  catData={context?.catData}
                                  index={index_}
                                  selectedCat={subCat?.parentId}
                                  selectedCatname={subCat?.parentCatName}
                                />
                                {subCat?.children?.length > 0 && (
                                  <ul className="pl-4">
                                    {subCat?.children?.map(
                                      (thirdLavel, index3) => (
                                        <li
                                          key={thirdLavel?._id || index3}
                                          className="w-full hover:bg-[#f1f1f1]"
                                        >
                                          <EditSubCatBox
                                            name={thirdLavel?.name} 
                                            catData={firstLavelCat?.children}
                                            index={index3}
                                            selectedCat={thirdLavel?.parentId}
                                            selectedCatname={
                                              thirdLavel?.parentCatName
                                            }
                                            id={thirdLavel?._id}
                                          />
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default SubCategoryList;
