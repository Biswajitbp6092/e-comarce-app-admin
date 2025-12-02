import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";

import Rating from "@mui/material/Rating";

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
import SearchBox from "../../Component/SearchBox/SearchBox";
import { myContext } from "../../App";

import {
  deleteData,
  deleteMultipleData,
  fetchDataFromApi,
} from "../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import CircularProgress from "@mui/material/CircularProgress";

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 140 },
  { id: "category", label: "CATEGORY", minWidth: 100, },
  { id: "subcategory", label: "SUB CATEGORY", minWidth: 140 },
  { id: "thirdcategory", label: "THIRD CATEGORY", minWidth: 150 },
  { id: "price", label: "PRICE", minWidth: 80 },
  { id: "sales", label: "SALES", minWidth: 80, align: "center" },
  { id: "rating", label: "RATING", minWidth: 80, align: "center" },
  { id: "action", label: "ACTION", minWidth: 130, align: "center" },
];

const Products = () => {
  const [productCat, setProductCat] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productData, setProductData] = useState([]);
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirtLavelCat, setProductThirtLavelCat] = useState("");
  const [sortedIds, setSortedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(myContext);

  useEffect(() => {
    getProducts();
    setIsLoading(true);
  }, [context?.isOppenFullScreenPanel]);

  const handelSelectAll = (e) => {
    const isChecked = e.target.checked;

    const updatedItems = productData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);

    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);

      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  const handelCheckboxChange = (e, id, index) => {
    const updatedItems = productData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
    );
    setProductData(updatedItems);
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  const deleteMultipleProduct = () => {
    if (sortedIds.length === 0) {
      context.openAlartBox("Error", "Please select items to Delete");
      return;
    }
    try {
      deleteMultipleData(`/api/product/deleteMultiple`, {
        data: { ids: sortedIds },
      }).then((res) => {
        getProducts();
        context.openAlartBox("Sucess", "Product Deleted");
      });
    } catch (error) {
      context.openAlartBox("Error", "Error deleting items");
    }
  };

  const getProducts = async () => {
    setIsLoading(true);
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      let productArr = [];
      if (res?.error !== false) {
        for (let i = 0; i < res?.data?.products?.length; i++) {
          productArr[i] = res?.data?.products[i];
          productArr[i].checked = false;
        }

        setTimeout(() => {
          setProductData(productArr);
          setIsLoading(false);
        }, 300);
      }
    });
  };
  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    setProductSubCat("");
    setProductThirtLavelCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductByCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error !== false) {
        setProductData(res?.data?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    });
  };
  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    setProductCat("");
    setProductThirtLavelCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductBySubCatId/${event.target.value}`
    ).then((res) => {
      if (res?.error !== false) {
        setProductData(res?.data?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    });
  };

  const handleChangeProductThirtLavelCat = (event) => {
    setProductThirtLavelCat(event.target.value);
    setProductCat("");
    setProductSubCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductByThirdLavelCat/${event.target.value}`
    ).then((res) => {
      if (res?.error !== false) {
        setProductData(res?.data?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`).then((res) => {
      getProducts();
      context.openAlartBox("Sucess", "Product Deleted");
      setIsLoading(false);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-2">
        <h2 className="text-[18px] font-[600]">Products </h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          {sortedIds?.length !== 0 && (
            <Button
              variant="contained"
              className="btn-sm"
              size="small"
              color="error"
              onClick={deleteMultipleProduct}
            >
              Delete
            </Button>
          )}
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
          <div className="flex items-center w-full px-5 justify-between gap-5">
            <div className="col w-[20%]">
              <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
              {context?.catData?.length !== 0 && (
                <Select
                  style={{ zoom: "80%" }}
                  labelId="demo-simple-select-label"
                  id="productCatDropdown"
                  size="small"
                  className="w-full"
                  value={productCat}
                  label="Category"
                  onChange={handleChangeProductCat}
                >
                  {context?.catData?.map((cat, index) => {
                    return (
                      <MenuItem value={cat?._id} key={index}>
                        {cat?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col w-[20%]">
              <h4 className="font-[600] text-[13px] mb-2">Sub Category By</h4>
              {context?.catData?.length !== 0 && (
                <Select
                  style={{ zoom: "80%" }}
                  labelId="demo-simple-select-label"
                  id="productCatDropdown"
                  size="small"
                  className="w-full"
                  value={productSubCat}
                  label="Sub Category"
                  onChange={handleChangeProductSubCat}
                >
                  {context?.catData?.map((cat, index) => {
                    return (
                      cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat, index_) => {
                        return (
                          <MenuItem value={subCat?._id}>
                            {subCat?.name}
                          </MenuItem>
                        );
                      })
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col w-[20%]">
              <h4 className="font-[600] text-[13px] mb-2">
                Third Lavel Category By
              </h4>
              {context?.catData?.length !== 0 && (
                <Select
                  style={{ zoom: "80%" }}
                  labelId="demo-simple-select-label"
                  id="productCatDropdown"
                  size="small"
                  className="w-full"
                  value={productThirtLavelCat}
                  label="Third Lavel Sub Category"
                  onChange={handleChangeProductThirtLavelCat}
                >
                  {context?.catData?.map((cat) => {
                    return (
                      cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat) => {
                        return (
                          subCat?.children?.length !== 0 &&
                          subCat?.children?.map((thirlavelCat, index) => {
                            return (
                              <MenuItem key={index} value={thirlavelCat?._id}>
                                {thirlavelCat?.name}
                              </MenuItem>
                            );
                          })
                        );
                      })
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col w-[20%] ml-auto mt-5">
              <SearchBox />
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
                        productData?.length > 0
                          ? productData.every((item) => item.checked)
                          : false
                      }
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell className="!text-[13px]"
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
                {isLoading === false ? (
                  productData?.length !== 0 &&
                  productData
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.reverse()
                    ?.map((product, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <Checkbox
                              size="small"
                              checked={product.checked === true ? true : false}
                              onChange={(e) =>
                                handelCheckboxChange(e, product._id, index)
                              }
                            />
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
                                <h3 className="font-[600] text-[14px] leading-4 hover:text-[#3872fa]">
                                  <Link to={`/product/${product?._id}`}>
                                    {product?.name}
                                  </Link>
                                </h3>
                                <span className="text-[11px]">
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
                            {product?.thirdSubCat}
                          </TableCell>

                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <div className="flex flex-col gap-1">
                              <span className="price text-[#3872fa] text-[12px] font-[600]">
                                &#x20b9; {product.price}
                              </span>
                              <span className="oldPrice line-through text-gray-500 text-[12px] font-[500]">
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
                            </div>
                          </TableCell>

                          <TableCell
                            style={{ minWidth: columns.minWidth }}
                            align="center"
                          >
                            <div className="flex flex-col items-center justify-center">
                              <p className="text-[14px] font-[600] mb-1">
                                <Rating
                                  name="half-rating"
                                  size="small"
                                  defaultValue={product?.rating}
                                />
                              </p>
                            </div>
                          </TableCell>

                          <TableCell
                            style={{ minWidth: columns.minWidth }}
                            align="center"
                          >
                            <div className="flex items-center justify-center gap-1">
                              <Tooltip title="Edit Product" placement="top">
                                <Button
                                  className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-[#d9d9d9]"
                                  onClick={() =>
                                    context.setIsOppenFullScreenPanel({
                                      open: true,
                                      model: "Edit Products",
                                      id: product?._id,
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
                                <Link to={`/product/${product?._id}`}>
                                  <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-[#d9d9d9]">
                                    <FaRegEye
                                      size={18}
                                      className="text-[rgba(0,0,0,0.7)]"
                                    />
                                  </Button>
                                </Link>
                              </Tooltip>
                              <Tooltip title="Remove Product" placement="top">
                                <Button
                                  className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-[#d9d9d9]"
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
                    })
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <div className="flex items-center justify-center w-full min-h-[400px]">
                          <CircularProgress color="inherit" />
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                )}
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
