import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { IoMdAdd } from "react-icons/io";

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

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ProgressBar from "../../Component/ProgressBar/ProgressBar";
import SearchBox from "../../Component/SearchBox/SearchBox";
import { myContext } from "../../App";

const HomeSliderBanner = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");

  const context = useContext(myContext);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const columns = [
    { id: "images", label: "IMAGES", minWidth: 250 },
    { id: "action", label: "ACTION", minWidth: 100 },
  ];
  const label = { inputProps: { "aria-label": "select all" } };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-2">
        <h2 className="text-[18px] font-[600]">
          Home Slider Banners{" "}
          <span className="font-[400] text-[14px]">(MUI CSS Table)</span>
        </h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          <Button className="btn !bg-green-600 !text-white btn-sm">
            Export
          </Button>
          <Button
            onClick={() =>
              context.setIsOppenFullScreenPanel({
                open: true,
                model: "Add Home Slider",
              })
            }
            className="btn-blue !text-white btn-sm"
          >
            Add Home Slider
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
                <TableRow hover>
                  <TableCell>
                    <Checkbox {...label} size="small" />
                  </TableCell>

                  <TableCell width={300}>
                    <div className="flex items-center gap-4 w-[300px]">
                      <div className="img w-full rounded-md overflow-hidden group">
                        <Link to={`/product/1`}>
                          <img
                            src="https://serviceapi.spicezgold.com/download/1755503364377_1721277298204_banner.jpg"
                            alt="Women Wide Leg Jeans"
                            className="w-full h-full object-cover group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell width={100}>
                    <div className="flex items-center gap-1">
                      <Tooltip title="Edit Product" placement="top">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                          <AiOutlineEdit
                            size={18}
                            className="text-[rgba(0,0,0,0.7)]"
                          />
                        </Button>
                      </Tooltip>
                      <Tooltip title="View Product" placement="top">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                          <FaRegEye
                            size={18}
                            className="text-[rgba(0,0,0,0.7)]"
                          />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Remove Product" placement="top">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                          <GoTrash
                            size={18}
                            className="text-[rgba(0,0,0,0.7)]"
                          />
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>

                  
                </TableRow>
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

export default HomeSliderBanner;
