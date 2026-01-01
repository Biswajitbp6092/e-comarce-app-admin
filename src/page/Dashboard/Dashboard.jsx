import React, { use, useContext, useState } from "react";
import DashboardBoxes from "../../Component/DashboardBoxes/DashboardBoxes";
import Button from "@mui/material/Button";
import { FaPlus, FaRegEye } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Badge from "../../Component/Badge/Badge";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import ProgressBar from "../../Component/ProgressBar/ProgressBar";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";

import Pagination from "@mui/material/Pagination";
import ProductDashboard from "../../Component/ProductDashboard/ProductDashboard";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { myContext } from "../../App";
import Products from "../Products/Products";
import { useEffect } from "react";
import { editData, fetchDataFromApi } from "../../utils/api";
import SearchBox from "../../Component/SearchBox/SearchBox";

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const Dashboard = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [productCat, setProductCat] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");

  const [chartData, setChartData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  const [productData, setProductData] = useState([]);
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirtLavelCat, setProductThirtLavelCat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortedIds, setSortedIds] = useState([]);

  const [ordersData, setOrdersData] = useState([]);

  const [pageOrder, setPageOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalOrdersData, setTotalOrdersData] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [users, setUser] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);

  const context = useContext(myContext);

  useEffect(() => {
    getProducts();
  }, [context?.isOppenFullScreenPanel]);

  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };

  useEffect(() => {
    fetchDataFromApi(
      `/api/order/admin/order-list?page=${pageOrder}&limit=5`
    ).then((res) => {
      if (res?.data?.error === false) {
        setOrdersData(res?.data?.data);
      }
    });
    fetchDataFromApi(`/api/order/admin/order-list`).then((res) => {
      if (res?.data?.error === false) {
        setTotalOrdersData(res?.data);
      }
    });

    fetchDataFromApi(`/api/order/count`).then((res) => {
      if (res?.data?.error === false) {
        setOrdersCount(res?.data?.count);
      }
    });
  }, [pageOrder]);

  useEffect(() => {
    if (searchQuery !== "") {
      const query = searchQuery.toLowerCase();

      const filteredOrders = totalOrdersData.filter(
        (order) =>
          order?._id?.toLowerCase().includes(query) ||
          order?.userId?.name?.toLowerCase().includes(query) ||
          order?.userId?.email?.toLowerCase().includes(query) ||
          order?.createdAt?.split("T")[0].includes(query)
      );

      setOrdersData(filteredOrders);
    } else {
      fetchDataFromApi(
        `/api/order/admin/order-list?page=${pageOrder}&limit=5`
      ).then((res) => {
        if (res?.data?.error === false) {
          setOrdersData(res.data.data);
        }
      });
    }
  }, [searchQuery]);

  useEffect(() => {
    getTotalSalesByYear();
    getTotalUsersByYear();
    fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
      if (res?.data?.error === false) {
        setUser(res?.data?.users);
      }
    });
    fetchDataFromApi(`/api/user/getAllReviews`).then((res) => {
      if (res?.data?.error === false) {
        setAllReviews(res?.data?.reviews);
      }
    });
  }, []);

  const handleChange = (e, id) => {
    setOrderStatus(e.target.value);
    const obj = {
      id: id,
      order_status: e.target.value,
    };
    editData(`/api/order/order-status/${id}`, obj).then((res) => {
      console.log(res);
      if (res?.data?.error === false) {
        context.openAlartBox("Sucess", res?.data?.message);
      }
    });
  };

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

  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

  const getTotalUsersByYear = () => {
    fetchDataFromApi(`/api/order/users`).then((res) => {
      const users = [];
      res?.data?.TotalUsers?.length !== 0 &&
        res?.data?.TotalUsers?.map((item) => {
          users.push({
            name: item?.name,
            TotalUsers: parseInt(item?.TotalUsers),
          });
        });
      const uniqueArray = users.filter(
        (obj, index, self) =>
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArray);
    });
  };

  const getTotalSalesByYear = () => {
    fetchDataFromApi(`/api/order/sales`).then((res) => {
      const sales = [];
      res?.data?.monthlySales?.length !== 0 &&
        res?.data?.monthlySales?.map((item) => {
          sales.push({
            name: item?.name,
            totalSales: parseInt(item?.totalSales),
          });
        });
      const uniqueArray = sales.filter(
        (obj, index, self) =>
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArray);
    });
  };

  const handleChangeYear = (event) => {
    getTotalSalesByYear(event.target.value);
    setYear(event.target.value);
  };

  return (
    <>
      <div className="w-full mt-2 lg:mt-4 py-2 px-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center gap-8 mb-5 justify-between rounded-md">
        <div className="info">
          <h1 className="text-[30px] font-bold leading-10 mb-3">
            Good Morning <br /> Cameron
          </h1>
          <p>
            Here's what happening on your Store today. See the statistics at
            once.
          </p>
          <br />
          <Button
            onClick={() =>
              context.setIsOppenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
            className="btn-blue !capitalize flex gap-2"
          >
            <FaPlus />
            Add Products
          </Button>
        </div>
        <img src="/shop-illustration.webp" alt="" className="w-[250px]" />
      </div>

      <DashboardBoxes
        orders={ordersCount}
        products={productData?.length}
        users={users?.length}
        reviews={allReviews?.length}
        category={context?.catData?.length}
      />

      <div className="mt-15">
        <Products />
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>

          <div className="w-full md:w-[25%] mt-4 md:mt-0">
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPageOrder={setPageOrder}
            />
          </div>
        </div>

        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-left text-gray-600 dark:text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-600">
              <tr>
                <th scope="col" className="px-3 md:px-6 py-3">
                  &nbsp;
                </th>
                <th scope="col" className="px-3 md:px-6 py-3 whitespace-nowrap">
                  Order Id
                </th>
                <th scope="col" className="px-3 md:px-6 py-3 whitespace-nowrap">
                  payment Id
                </th>
                <th scope="col" className="px-3 md:px-6 py-3 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="px-3 md:px-6 py-3 whitespace-nowrap">
                  Phone Number
                </th>
                <th scope="col" className="px-3 md:px-6 py-3 whitespace-nowrap">
                  Address
                </th>
                <th scope="col" className="px-3 md:px-6 py-3 whitespace-nowrap">
                  Pincode
                </th>
                <th scope="col" className="px-3 md:px-6 py-3 whitespace-nowrap">
                  Total Amount
                </th>
                <th scope="col" className="px-3 md:px-6 py-3 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-3 md:px-6 py-3 whitespace-nowrap">
                  User Id
                </th>
                <th scope="col" className="px-3 md:px-6 py-3 whitespace-nowrap">
                  Order Status
                </th>
                <th scope="col" className="px-3 md:px-6 py-3 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersData?.length !== 0 &&
                ordersData?.map((order, index) => {
                  return (
                    <>
                      <tr className="bg-white border-b  dark:border-gray-700">
                        <td className="px-3 md:px-6 py-4 font-[500]">
                          <Button
                            onClick={() => isShowOrderProduct(index)}
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                          >
                            {isOpenOrderProduct === index ? (
                              <IoIosArrowUp
                                size={18}
                                className="text-[rgba(0,0,0,0.7)]"
                              />
                            ) : (
                              <IoIosArrowDown
                                size={18}
                                className="text-[rgba(0,0,0,0.7)]"
                              />
                            )}
                          </Button>
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 font-[500]">
                          <span className="text-[#3872fa]">{order?._id}</span>
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 font-[500] whitespace-nowrap">
                          <span className="text-[#3872fa]">
                            {order?.paymentId || "Cash On Delivery"}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4  font-[500] whitespace-nowrap">
                          {order?.userId?.name}
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4  font-[500]">
                          {order?.delivery_address?.mobile}
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4  font-[500]">
                          <span className="block w-[400px]">
                            {order?.delivery_address?.address_line +
                              ", " +
                              order?.delivery_address?.city +
                              ", " +
                              order?.delivery_address?.landmark +
                              ", " +
                              order?.delivery_address?.state +
                              ", " +
                              order?.delivery_address?.country}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 font-[500]">
                          {order?.delivery_address?.pin_code}
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 font-[500]">
                          {order?.totalAmt?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 font-[500]">
                          {order?.userId?.email}
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 font-[500]">
                          <span className="text-[#3872fa]">
                            {order?.userId?._id}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 font-[500]">
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={
                              order?.order_status !== null
                                ? order?.order_status
                                : orderStatus
                            }
                            label="Status"
                            size="small"
                            className="w-full"
                            onChange={(e) => handleChange(e, order?._id)}
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="confirm">Confirm</MenuItem>
                            <MenuItem value="delivered">Delivered</MenuItem>
                          </Select>
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4  font-[500] whitespace-nowrap">
                          {order?.createdAt?.split("T")[0]}
                        </td>
                      </tr>
                      {isOpenOrderProduct === index && (
                        <tr>
                          <td className="pl-20" colSpan={6}>
                            <div className="relative overflow-x-auto">
                              <table class="w-full text-sm text-left rtl:text-left text-gray-600 dark:text-gray-600">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-600">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Product Id
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Product Title
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Image
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Quentity
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Price
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Sub Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order?.products?.map((item, index) => {
                                    return (
                                      <tr
                                        key={index}
                                        class="bg-white border-b  dark:border-gray-700"
                                      >
                                        <td className="px-6 py-4 font-[500]">
                                          <span className="text-gray-600">
                                            {item?._id}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                          <div className="w-[250px]">
                                            {item?.productTitle}
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                          <img
                                            src={item?.image}
                                            alt=""
                                            className="w-[40px] h-[40px] object-cover overflow-hidden rounded-md"
                                          />
                                        </td>
                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                          {item?.quantity}
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                          {item?.price?.toLocaleString(
                                            "en-US",
                                            {
                                              style: "currency",
                                              currency: "INR",
                                            }
                                          )}
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                          {item?.subTotal?.toLocaleString(
                                            "en-US",
                                            {
                                              style: "currency",
                                              currency: "INR",
                                            }
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                  <tr>
                                    <td
                                      className="bg-[#f1f1f1]"
                                      colSpan="12"
                                    ></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
        {totalOrdersData?.totalPages > 1 && (
          <div className="flex items-center  justify-center mt-10 pb-5">
            <Pagination
              showFirstButton
              showLastButton
              count={Math.max(totalOrdersData?.totalPages || 1, 1)}
              page={pageOrder}
              onChange={(e, value) => setPageOrder(value)}
            />
          </div>
        )}
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5 pb-0">
          <h2 className="text-[18px] font-[600]">Total users & Total Sale</h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-5 px-5 py-5 pt-1">
          <Button
            className="flex items-center gap-1 text-[15px] cursor-pointer"
            onClick={getTotalUsersByYear}
          >
            <span className="block w-[8px] h-[8px] rounded-full bg-[#085857]"></span>
            Total Users
          </Button>

          <Button
            className="flex items-center gap-1 text-[15px] cursor-pointer"
            onClick={getTotalSalesByYear}
          >
            <span className="block w-[8px] h-[8px] rounded-full bg-[#3872fa]"></span>
            Total Sales
          </Button>
        </div>

        {chartData?.length !== 0 && (
          <BarChart
            width={context?.windowWidth >=920 ? (context?.windowWidth - 360) :(context?.windowWidth - 50) }
            height={context?.windowWidth < 640 ? 250 : context?.windowWidth < 1024 ? 400 :500}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="name"
              scale={"point"}
              padding={{ left: 10, right: 10 }}
              tick={{ fontSize: 12 }}
              label={{ position: "insideBottom", fontSize: 14 }}
              style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{ position: "insideBottom", fontSize: 14 }}
              style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#071739",
                color: "white",
              }}
              labelStyle={{ color: "yellow" }}
              itemStyle={{ color: "cyan" }}
              cursor={{ fill: "white" }}
            />
            <Legend />
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              vertical={false}
            />
            <Bar dataKey="totalSales" stackId="a" fill="#3872fa" />
            <Bar dataKey="TotalUsers" stackId="b" fill="#085857" />
          </BarChart>
        )}
      </div>
    </>
  );
};

export default Dashboard;
