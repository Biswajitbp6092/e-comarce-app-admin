import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";

import { GoTrash } from "react-icons/go";

import { myContext } from "../../App";
import { useEffect } from "react";
import { deleteData, fetchDataFromApi } from "../../utils/api";

const columns = [
  { id: "images", label: "IMAGES", minWidth: 100 },
  { id: "title", label: "TITLE", minWidth: 200 },
  { id: "description", label: "DESCRIPTIONS", minWidth: 300 },
  { id: "action", label: "ACTION", minWidth: 100 },
];
const label = { inputProps: { "aria-label": "select all" } };

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [blogData, setBlogData] = useState([]);

  const context = useContext(myContext);

  useEffect(() => {
    getData();
  }, [context.isOppenFullScreenPanel]);

  const getData = () => {
    fetchDataFromApi(`/api/blog`).then((res) => {
      console.log("res", res);
      setBlogData(res?.data?.blogs);
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const deleteSlide = (id) => {
    deleteData(`/api/blog/${id}`).then((res) => {
      context.openAlartBox("Sucess", "Blog Deleted");
      getData();
      setIsLoading(false);
    });
  };

  const stripHtml = (html) => {
    let div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-2">
        <h2 className="text-[18px] font-[600]">
          Blog List <span className="font-[400] text-[14px]"></span>
        </h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          <Button
            onClick={() =>
              context.setIsOppenFullScreenPanel({
                open: true,
                model: "Add Blog",
              })
            }
            className="btn-blue !text-white btn-sm"
          >
            Add Blog
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
                {console.log("blogData", blogData)}
                {blogData?.length !== 0 &&
                  blogData?.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell width={300}>
                          <div className="flex items-center gap-4 w-[300px]">
                            <div className="img w-full rounded-md overflow-hidden group">
                              <Link to={`/product/1`}>
                                <img
                                  src={item.images[0]}
                                  alt="Women Wide Leg Jeans"
                                  className="w-full h-[150px] object-cover group-hover:scale-105 transition-all"
                                />
                              </Link>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell width={200}>
                          <span className="text-[15px] font-[500]">
                            {item?.title}
                          </span>
                        </TableCell>
                        <TableCell width={300}>
                          <div className="text-[14px] text-gray-700">
                            {stripHtml(item?.description)?.substring(0, 300)}...
                          </div>
                        </TableCell>

                        <TableCell width={100}>
                          <div className="flex items-center gap-1">
                            <Tooltip title="Edit Product" placement="top">
                              <Button
                                className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                                onClick={() =>
                                  context.setIsOppenFullScreenPanel({
                                    open: true,
                                    model: "Edit Blog",
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

                            <Tooltip title="Remove Product" placement="top">
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
            count={blogData?.length}
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

export default Blog;
