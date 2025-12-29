import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

import { data, Link } from "react-router-dom";
import SearchBox from "../../Component/SearchBox/SearchBox";
import { myContext } from "../../App";
import { MdOutlineMail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { useEffect } from "react";
import { deleteMultipleData, fetchDataFromApi } from "../../utils/api";
import Button from "@mui/material/Button";

const columns = [
  { id: "userImg", label: "USERS IMAGE", minWidth: 80 },
  { id: "userName", label: "USERS NAME", minWidth: 100 },
  { id: "userEmail", label: "USERS EMAIL", minWidth: 170 },
  { id: "userPh", label: "USER PHONE NO", minWidth: 170 },
  { id: "createdDate", label: "CREATED", minWidth: 170 },
];
const label = { inputProps: { "aria-label": "select all" } };

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setUserData] = useState([]);
  const [userTotalData, setUserTotalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedIds, setSortedIds] = useState([]);

  const context = useContext(myContext);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setIsLoading(true);
    fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
      setTimeout(() => {
        setUserData(res?.data?.users);
        setUserTotalData(res?.data?.users);
        setIsLoading(false);
      },500);
    });
  };

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredUsers = userTotalData.filter(
        (user) =>
          user._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.createdAt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.mobile && user.mobile.toString().includes(searchQuery))
      );
      setUserData(filteredUsers);
    } else {
      fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
        if (res?.data?.error === false) {
          setUserData(res?.data?.users);
          setIsLoading(false);
        }
      });
    }
  }, [searchQuery]);

  const handelSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedItems = userData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setUserData(updatedItems);

    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  const handelCheckboxChange = (e, id, index) => {
    const updatedItems = userData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
    );
    setUserData(updatedItems);

    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  const deleteMultiple = () => {
    if (sortedIds.length === 0) {
      context?.openAlartBox(
        "Error",
        "Please select at least one user to delete."
      );
      return;
    }

    try {
      deleteMultipleData(`/api/user/deleteMultiple`, {
        data: { ids: sortedIds },
      }).then((res) => {
        getUsers();
        context?.openAlartBox(
          "Sucess",
          res?.data?.message || "Deleted successfully"
        );
        setSortedIds([]);
      });
    } catch (error) {}
  };

  return (
    <>
      <section>
        <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
          <div className="flex items-center w-full px-5 justify-between">
            <div className="col w-[40%]">
              <h2 className="text-[18px] font-[600]">Users List </h2>
            </div>

            <div className="col w-[40%] ml-auto flex items-center justify-end gap-4">
              {sortedIds.length !== 0 && (
                <Button
                  variant="contained"
                  className="btn-sm"
                  size="small"
                  color="error"
                  onClick={deleteMultiple}
                >
                  Delete{" "}
                </Button>
              )}
              <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>
          <br />

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      size="small"
                      onChange={handelSelectAll}
                      checked={
                        userData?.length > 0
                          ? userData.every((item) => item.checked)
                          : false
                      }
                    />
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
                {isLoading === false ? (
                  userData?.length !== 0 &&
                  userData
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.reverse()
                    ?.map((user, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell style={{ width: columns.minWidth }}>
                            <Checkbox
                              {...label}
                              size="small"
                              checked={user.checked === true ? true : false}
                              onChange={(e) =>
                                handelCheckboxChange(e, user._id, index)
                              }
                            />
                          </TableCell>

                          <TableCell style={{ width: columns.minWidth }}>
                            <div className="flex items-center gap-4 w-[70px]">
                              <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                <Link to="/product/45745" data-discover="true">
                                  <div className="w-[45px] h-[45px] rounded-full overflow-hidden flex items-center justify-center bg-[#3872fa] text-white font-bold text-lg uppercase">
                                    {user?.avatar ? (
                                      <img
                                        src={user.avatar}
                                        alt={user?.name}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      user?.name?.charAt(0) || "U"
                                    )}
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell style={{ width: columns.minWidth }}>
                            {user?.name}
                          </TableCell>

                          <TableCell style={{ width: columns.minWidth }}>
                            <span className="flex items-center gap-2">
                              <MdOutlineMail />
                              {user?.email}
                            </span>
                          </TableCell>

                          <TableCell style={{ width: columns.minWidth }}>
                            <span className="flex items-center gap-2">
                              <IoCall />
                              {user?.mobile || "No Number Found"}
                            </span>
                          </TableCell>

                          <TableCell style={{ width: columns.minWidth }}>
                            <span className="flex items-center gap-2">
                              <IoCalendarOutline />
                              {user?.createdAt.split("T")[0]}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow
                    style={{ height: 200, textAlign: "center", width: "100%" }}
                  >
                    <TableCell colSpan={6} style={{ position: "relative" }}>
                      <span className="inset-0 flex items-center justify-center text-xl">
                        Loading...
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={userData?.length}
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
