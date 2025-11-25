import React, { useContext, useEffect, useState } from "react";
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
import Modal from "@mui/material/Modal";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 170 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "subcategory", label: "SUB CATEGORY", minWidth: 170 },
  { id: "price", label: "PRICE", minWidth: 170 },
  { id: "sales", label: "SALES", minWidth: 170, align: "center" },
  { id: "action", label: "ACTION", minWidth: 170, align: "center" },
];

const Products = () => {
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productData, setProductData] = useState([]);

  const context = useContext(myContext);

  useEffect(() => {
    getProducts();
  }, [context?.isOppenFullScreenPanel]);

  const getProducts = async () => {
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      if (res?.error !== false) {
        setProductData(res?.data?.products);
      }
    });
  };
  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`).then((res) => {
      getProducts();
      context.openAlartBox("Sucess", "Product Deleted");
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-2">
        <h2 className="text-[18px] font-[600]">
          Products{" "}
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
                model: "Add Product",
              })
            }
            className="btn-blue !text-white btn-sm"
          >
            Add Product
          </Button>
        </div>
      </div>

      <section>
        <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
          <div className="flex items-center w-full px-5 justify-between">
            <div className="col w-[20%]">
              <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
              <Select
                className="w-full"
                size="small"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={categoryFilterVal}
                onChange={handleChangeCatFilter}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Man</MenuItem>
                <MenuItem value={20}>Woman</MenuItem>
                <MenuItem value={30}>KIds</MenuItem>
              </Select>
            </div>
            <div className="col w-[20%] ml-auto">
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
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {productData?.length !== 0 &&
                  productData
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((product, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <Checkbox size="small" />
                          </TableCell>

                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <div className="flex items-center gap-4 w-[300px]">
                              <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                <Link
                                  to={`/product/${product?._id}`}
                                  data-discover="true"
                                >
                                  <LazyLoadImage
                                    alt={"image"}
                                    effect="blur"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-all"
                                    src={product?.images[0]}
                                  />
                                </Link>
                              </div>
                              <div className="info w-[75%]">
                                <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                                  <Link to={`/product/${product?._id}`}>
                                    {product?.name}
                                  </Link>
                                </h3>
                                <span className="text-[12px]">
                                  {product?.brand}
                                </span>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell style={{ minWidth: columns.minWidth }}>
                            {product?.catName}
                          </TableCell>

                          <TableCell style={{ minWidth: columns.minWidth }}>
                            {product?.subCat}
                          </TableCell>

                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <div className="flex flex-col gap-1">
                              <span className="price text-[#3872fa] text-[14px] font-[600]">
                                &#x20b9; {product.price}
                              </span>
                              <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                                &#x20b9; {product?.oldPrice}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell
                            style={{ minWidth: columns.minWidth }}
                            align="center"
                          >
                            <div className="flex flex-col items-center justify-center">
                              <p className="text-[14px] font-[600] mb-1">
                                {product.sale} Sale
                              </p>
                              <div className="w-full max-w-[100px]">
                                {/* <ProgressBar
                                value={row.progress}
                                type="success"
                              /> */}
                              </div>
                            </div>
                          </TableCell>

                          <TableCell
                            style={{ minWidth: columns.minWidth }}
                            align="center"
                          >
                            <div className="flex items-center justify-center gap-1">
                              <Tooltip title="Edit Product" placement="top">
                                <Button
                                  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                                  onClick={() =>
                                    context.setIsOppenFullScreenPanel({
                                      open: true,
                                      model: "Edit Products",
                                      id:product?._id,
                                    })
                                  }
                                >
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
                                <Button
                                  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                                  onClick={() => deleteProduct(product?._id)}
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
            count={productData?.length}
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

export default Products;
