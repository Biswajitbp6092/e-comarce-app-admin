import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

import { Link } from "react-router-dom";
import SearchBox from "../../Component/SearchBox/SearchBox";
import { myContext } from "../../App";
import { MdOutlineMail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";

const columns = [
  { id: "userImg", label: "USERS IMAGE", minWidth: 80 },
  { id: "userName", label: "USERS NAME", minWidth: 100 },
  { id: "userEmail", label: "USERS EMAIL", minWidth: 170 },
  { id: "userPh", label: "USER PHONE NO", minWidth: 170 },
  { id: "createdDate", label: "CREATED", minWidth: 170 },
];
const label = { inputProps: { "aria-label": "select all" } };

const Users = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const context = useContext(myContext);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <section>
        <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
          <div className="flex items-center w-full px-5 justify-between">
            <div className="col w-[40%]">
              <h2 className="text-[18px] font-[600]">
                Users List{" "}
                <span className="font-[400] text-[14px]">(MUI CSS Table)</span>
              </h2>
            </div>
            <div className="col w-[40%] ml-auto">
              <SearchBox />
            </div>
          </div>
          <br />

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox size="small" />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "left"}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell style={{ width: columns.minWidth }}>
                    <Checkbox {...label} size="small" />
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <div className="flex items-center gap-4 w-[70px]">
                      <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                        <Link to="/product/45745" data-discover="true">
                          <img
                            src="https://mui.com/static/images/avatar/1.jpg"
                            alt="User"
                            className="w-full  group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                    </div>
                  </TableCell>

                  {/* USER NAME */}
                  <TableCell style={{ width: columns.minWidth }}>
                    John Doe
                  </TableCell>

                  {/* USER EMAIL */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <MdOutlineMail />
                      johndoe@example.com
                    </span>
                  </TableCell>

                  {/* USER PHONE */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCall />
                      +91 9876543210
                    </span>
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCalendarOutline />
                      07-10-2025
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ width: columns.minWidth }}>
                    <Checkbox {...label} size="small" />
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <div className="flex items-center gap-4 w-[70px]">
                      <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                        <Link to="/product/45745" data-discover="true">
                          <img
                            src="https://mui.com/static/images/avatar/1.jpg"
                            alt="User"
                            className="w-full  group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                    </div>
                  </TableCell>

                  {/* USER NAME */}
                  <TableCell style={{ width: columns.minWidth }}>
                    John Doe
                  </TableCell>

                  {/* USER EMAIL */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <MdOutlineMail />
                      johndoe@example.com
                    </span>
                  </TableCell>

                  {/* USER PHONE */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCall />
                      +91 9876543210
                    </span>
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCalendarOutline />
                      07-10-2025
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ width: columns.minWidth }}>
                    <Checkbox {...label} size="small" />
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <div className="flex items-center gap-4 w-[70px]">
                      <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                        <Link to="/product/45745" data-discover="true">
                          <img
                            src="https://mui.com/static/images/avatar/1.jpg"
                            alt="User"
                            className="w-full  group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                    </div>
                  </TableCell>

                  {/* USER NAME */}
                  <TableCell style={{ width: columns.minWidth }}>
                    John Doe
                  </TableCell>

                  {/* USER EMAIL */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <MdOutlineMail />
                      johndoe@example.com
                    </span>
                  </TableCell>

                  {/* USER PHONE */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCall />
                      +91 9876543210
                    </span>
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCalendarOutline />
                      07-10-2025
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ width: columns.minWidth }}>
                    <Checkbox {...label} size="small" />
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <div className="flex items-center gap-4 w-[70px]">
                      <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                        <Link to="/product/45745" data-discover="true">
                          <img
                            src="https://mui.com/static/images/avatar/1.jpg"
                            alt="User"
                            className="w-full  group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                    </div>
                  </TableCell>

                  {/* USER NAME */}
                  <TableCell style={{ width: columns.minWidth }}>
                    John Doe
                  </TableCell>

                  {/* USER EMAIL */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <MdOutlineMail />
                      johndoe@example.com
                    </span>
                  </TableCell>

                  {/* USER PHONE */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCall />
                      +91 9876543210
                    </span>
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCalendarOutline />
                      07-10-2025
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ width: columns.minWidth }}>
                    <Checkbox {...label} size="small" />
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <div className="flex items-center gap-4 w-[70px]">
                      <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                        <Link to="/product/45745" data-discover="true">
                          <img
                            src="https://mui.com/static/images/avatar/1.jpg"
                            alt="User"
                            className="w-full  group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                    </div>
                  </TableCell>

                  {/* USER NAME */}
                  <TableCell style={{ width: columns.minWidth }}>
                    John Doe
                  </TableCell>

                  {/* USER EMAIL */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <MdOutlineMail />
                      johndoe@example.com
                    </span>
                  </TableCell>

                  {/* USER PHONE */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCall />
                      +91 9876543210
                    </span>
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCalendarOutline />
                      07-10-2025
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ width: columns.minWidth }}>
                    <Checkbox {...label} size="small" />
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <div className="flex items-center gap-4 w-[70px]">
                      <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                        <Link to="/product/45745" data-discover="true">
                          <img
                            src="https://mui.com/static/images/avatar/1.jpg"
                            alt="User"
                            className="w-full  group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                    </div>
                  </TableCell>

                  {/* USER NAME */}
                  <TableCell style={{ width: columns.minWidth }}>
                    John Doe
                  </TableCell>

                  {/* USER EMAIL */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <MdOutlineMail />
                      johndoe@example.com
                    </span>
                  </TableCell>

                  {/* USER PHONE */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCall />
                      +91 9876543210
                    </span>
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCalendarOutline />
                      07-10-2025
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{ width: columns.minWidth }}>
                    <Checkbox {...label} size="small" />
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <div className="flex items-center gap-4 w-[70px]">
                      <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                        <Link to="/product/45745" data-discover="true">
                          <img
                            src="https://mui.com/static/images/avatar/1.jpg"
                            alt="User"
                            className="w-full  group-hover:scale-105 transition-all"
                          />
                        </Link>
                      </div>
                    </div>
                  </TableCell>

                  {/* USER NAME */}
                  <TableCell style={{ width: columns.minWidth }}>
                    John Doe
                  </TableCell>

                  {/* USER EMAIL */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <MdOutlineMail />
                      johndoe@example.com
                    </span>
                  </TableCell>

                  {/* USER PHONE */}
                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCall />
                      +91 9876543210
                    </span>
                  </TableCell>

                  <TableCell style={{ width: columns.minWidth }}>
                    <span className="flex items-center gap-2">
                      <IoCalendarOutline />
                      07-10-2025
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={1}
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

export default Users;
