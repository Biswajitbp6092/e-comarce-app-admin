import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";

import { myContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CategoryList = () => {
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const context = useContext(myContext);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      context?.setCatData(res?.data?.data);
    });
  }, [context?.isOppenFullScreenPanel]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const deletCat = (id) => {
    deleteData(`/api/category/${id}`).then((res) => {
      fetchDataFromApi("/api/category").then((res) => {
        context?.setCatData(res?.data?.data);
      });
    });
  };

  const columns = [
    { id: "images", label: "IMAGES", minWidth: 150 },
    { id: "catName", label: "CATEGORY NAME", minWidth: 150 },
    { id: "action", label: "ACTION", minWidth: 100 },
  ];
  const label = { inputProps: { "aria-label": "select all" } };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-2">
        <h2 className="text-[18px] font-[600]">
          Category List{" "}
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
                model: "Add New Category",
              })
            }
            className="btn-blue !text-white btn-sm"
          >
            Add New Category
          </Button>
        </div>
      </div>

      <section>
        <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell width={60}>
                    <Checkbox {...label} size="small" />
                  </TableCell>

                  {columns.map((column) => (
                    <TableCell
                      width={column.minWidth}
                      key={column.id}
                      align={column.align}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {context?.catData?.length !== 0 &&
                  context?.catData?.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox {...label} size="small" />
                        </TableCell>

                        <TableCell width={100}>
                          <div className="flex items-center gap-4 w-[80px]">
                            <div className="img w-full rounded-md overflow-hidden group">
                              <Link to="/product/12587" data-discover="true">
                                <LazyLoadImage
                                  alt={"image"}
                                  effect="blur"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-all"
                                  src={item.images[0]}
                                />
                              </Link>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell width={100}>{item.name}</TableCell>

                        <TableCell width={100}>
                          <div className="flex items-center gap-1">
                            <Tooltip title="Edit Product" placement="top">
                              <Button
                                className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                                onClick={() =>
                                  context.setIsOppenFullScreenPanel({
                                    open: true,
                                    model: "Edit Category",
                                    id: item?._id,
                                  })
                                }
                              >
                                <AiOutlineEdit
                                  size={18}
                                  className="text-[rgba(0,0,0,0.7)]"
                                />
                              </Button>
                            </Tooltip>
                            {/* <Tooltip title="View Product" placement="top">
                              <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                                <FaRegEye
                                  size={18}
                                  className="text-[rgba(0,0,0,0.7)]"
                                />
                              </Button>
                            </Tooltip> */}
                            <Tooltip title="Remove Product" placement="top">
                              <Button
                                className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                                onClick={() => {
                                  deletCat(item?._id);
                                }}
                              >
                                <GoTrash
                                  size={18}
                                  className="text-[rgba(0,0,0,0.7)]"
                                />
                              </Button>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={2}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </section>
    </>
  );
};

export default CategoryList;
