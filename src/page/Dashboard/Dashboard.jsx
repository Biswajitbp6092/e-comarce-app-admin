import React, { useContext, useState } from "react";
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
import { fetchDataFromApi } from "../../utils/api";

const Dashboard = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
    const [orders, setOrders] = useState([]);

  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };

  const [categoryFilterVal, setCategoryFilterVal] = useState("");

  const context = useContext(myContext);

  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const [chart1Data, setChart1Data] = useState([
    {
      name: "JAN",
      Users: 4000,
      Sales: 2400,
      amt: 2400,
    },
    {
      name: "FEb",
      Users: 3000,
      Sales: 1398,
      amt: 2210,
    },
    {
      name: "MAR",
      Users: 2000,
      Sales: 9800,
      amt: 2290,
    },
    {
      name: "APR",
      Users: 2780,
      Sales: 3908,
      amt: 2000,
    },
    {
      name: "MAY",
      Users: 1890,
      Sales: 4800,
      amt: 2181,
    },
    {
      name: "JUN",
      Users: 2000,
      Sales: 9800,
      amt: 2290,
    },
    {
      name: "JUL",
      Users: 4000,
      Sales: 6000,
      amt: 2400,
    },
    {
      name: "AUG",
      Users: 1890,
      Sales: 4800,
      amt: 2181,
    },
    {
      name: "SEP",
      Users: 9490,
      Sales: 2300,
      amt: 2100,
    },
    {
      name: "OCT",
      Users: 3490,
      Sales: 1300,
      amt: 2100,
    },
    {
      name: "NOV",
      Users: 490,
      Sales: 4300,
      amt: 2100,
    },
    {
      name: "DEC",
      Users: 9000,
      Sales: 8000,
      amt: 2400,
    },
  ]);

  useEffect(() => {
    fetchDataFromApi("/api/order/order-list").then((res) => {
      if (res?.data?.error === false) {
        setOrders(res?.data?.data);
      }
    });
  }, []);

  return (
    <>
      <div className="w-full py-2 px-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
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

      
      <DashboardBoxes />

      <div className="mt-15">
        <Products />
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        </div>
       <div className="relative overflow-x-auto mt-5 pb-5">
        <table class="w-full text-sm text-left rtl:text-left text-gray-600 dark:text-gray-600">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-600">
            <tr>
              <th scope="col" class="px-6 py-3">
                &nbsp;
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                payment Id
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Name
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Address
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Pincode
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Email
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                User Id
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Order Status
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.length !== 0 &&
              orders?.map((order, index) => {
                return (
                  <>
                    <tr
                      key={index}
                      class="bg-white border-b  dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-[500]">
                        {" "}
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
                      <td className="px-6 py-4 font-[500]">
                        <span className="text-[#3872fa]">{order?._id}</span>
                      </td>
                      <td className="px-6 py-4 font-[500]">
                        <span className="text-[#3872fa]">
                          {order?.paymentId || "Cash On Delivery"}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-[500] whitespace-nowrap">
                        {order?.userId?.name}
                      </td>
                      <td className="px-6 py-4 font-[500]">
                        {order?.delivery_address?.mobile}
                      </td>
                      <td className="px-6 py-4 font-[500]">
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
                      <td className="px-6 py-4 font-[500]">
                        {order?.delivery_address?.pin_code}
                      </td>
                      <td className="px-6 py-4 font-[500]">
                        {order?.totalAmt}
                      </td>
                      <td className="px-6 py-4 font-[500]">
                        {order?.userId?.email}
                      </td>
                      <td className="px-6 py-4 font-[500]">
                        <span className="text-[#3872fa]">
                          {order?.userId?._id}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-[500]">
                        <Badge status={order?.order_status?.toLowerCase()} />
                      </td>
                      <td className="px-6 py-4 font-[500] whitespace-nowrap">
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
                                        {item?.price?.toLocaleString("en-US", {
                                          style: "currency",
                                          currency: "INR",
                                        })}
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
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5 pb-0">
          <h2 className="text-[18px] font-[600]">Total users & Total Sale</h2>
        </div>

        <div className="flex items-center gap-5 px-5 py-5 pt-1">
          <span className="flex items-center gap-1 text-[15px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
            Total Users
          </span>

          <span className="flex items-center gap-1 text-[15px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-[#3872fa]"></span>
            Total Sales
          </span>
        </div>



        <LineChart
          width={1200}
          height={500}
          data={chart1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Sales"
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Users"
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart>
      </div>
    </>
  );
};

export default Dashboard;
