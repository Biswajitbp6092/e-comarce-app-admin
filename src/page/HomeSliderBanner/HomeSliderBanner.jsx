import React, { useContext, useState } from "react";
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
import { useEffect } from "react";
import { deleteData, fetchDataFromApi } from "../../utils/api";

const columns = [
  { id: "images", label: "IMAGES", minWidth: 250 },
  { id: "action", label: "ACTION", minWidth: 100 },
];
const label = { inputProps: { "aria-label": "select all" } };

const HomeSliderBanner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [slideData, setSlideData] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);

  const context = useContext(myContext);

  useEffect(() => {
    getData();
  }, [context.isOppenFullScreenPanel]);

  const getData = () => {
    fetchDataFromApi(`/api/homeSlides`).then((res) => {
      setSlideData(res?.data?.data);
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => setPage(newPage);

  const deleteSlide = (id) => {
    deleteData(`/api/homeSlides/${id}`).then((res) => {
      context.openAlartBox("Sucess", "slide Deleted");
      getData();
      setIsLoading(false);
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 py-0 mt-2 items-center">
        <h2 className="text-[18px] font-[600] text-left">
          Home Slider Banners <span className="font-[400] text-[14px]"></span>
        </h2>

        <div className="mt-3 md:mt-0 flex md:justify-end">
          <Button
            onClick={() =>
              context.setIsOppenFullScreenPanel({
                open: true,
                model: "Add Home Slider",
              })
            }
            className="btn-blue !text-white btn-lg"
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
                {slideData?.length !== 0 &&
                  slideData?.map((item, index) => {
                    return (
                      <TableRow hover>
                        <TableCell width={300}>
                          <div className="flex items-center gap-4 w-[300px]">
                            <div className="img w-full rounded-md overflow-hidden group">
                              <Link to={`/product/1`}>
                                <img
                                  src={item.images[0]}
                                  alt="Slide"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-all"
                                />
                              </Link>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell width={100}>
                          <div className="flex items-center gap-1">
                            <Tooltip title="Edit Banner" placement="top">
                              <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                                <AiOutlineEdit
                                  size={18}
                                  className="text-[rgba(0,0,0,0.7)]"
                                />
                              </Button>
                            </Tooltip>

                            <Tooltip title="Remove Banner" placement="top">
                              <Button
                                className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                                onClick={() => deleteSlide(item?._id)}
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

export default HomeSliderBanner;
