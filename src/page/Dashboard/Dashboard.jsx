import React, { useState } from "react";
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

const Dashboard = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };

  const [categoryFilterVal, setCategoryFilterVal] = useState("");

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
          <Button className="btn-blue !capitalize flex gap-2">
            <FaPlus />
            Add Products
          </Button>
        </div>
        <img src="/shop-illustration.webp" alt="" className="w-[250px]" />
      </div>
      <DashboardBoxes />

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">
            Products{" "}
            <span className="font-[400] text-[14px]">(tailwind css table)</span>
          </h2>
        </div>
        <div className="flex items-center w-full pl-5 justify-between pr-5">
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
          <div className="col w-[25%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white btn-sm">
              Export
            </Button>
            <Button className="btn-blue !text-white btn-sm">Add Product</Button>
          </div>
        </div>
        <div className="relative overflow-x-auto mt-5 pb-5">
          <table class="w-full text-sm text-left rtl:text-left text-gray-600 dark:text-gray-600">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-600">
              <tr>
                <th scope="col" class="px-6 py-3" width="10%">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </th>
                <th scope="col" className="px-0 py-3 whitespace-nowrap">
                  Products
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Sub Category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Sales
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 */}
              <tr className="odd:bg-white">
                <td class="px-6 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td class="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/8956">
                        <img
                          src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                          alt=""
                          className="w-full object-cover group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                        <Link to="/product/8956">
                          Women Wide Leg High-Rise Light Fade Stretchable Je...
                        </Link>
                      </h3>
                      <span className="text-[12px]">Flying Machine</span>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-2">Fashion</td>
                <td class="px-6 py-2">Women</td>
                <td class="px-6 py-2">
                  <div className="flex  gap-1 flex-col">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[#3872fa] text-[14px] font-[600]">
                      $58.00
                    </span>
                  </div>
                </td>
                <td class="px-6 py-2">
                  <p className="text-[14px] w-[100%]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={30} type="warning" />
                </td>
                <td class="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                      <AiOutlineEdit
                        size={32}
                        className="text-[rgba(0,0,0,0.7)]"
                      />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                      <FaRegEye size={32} className="text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                      <GoTrash size={32} className="text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr className="odd:bg-white">
                <td class="px-6 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td class="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/8956">
                        <img
                          src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                          alt=""
                          className="w-full object-cover group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                        <Link to="/product/8956">
                          Women Wide Leg High-Rise Light Fade Stretchable Je...
                        </Link>
                      </h3>
                      <span className="text-[12px]">Flying Machine</span>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-2">Fashion</td>
                <td class="px-6 py-2">Women</td>
                <td class="px-6 py-2">
                  <div className="flex  gap-1 flex-col">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[#3872fa] text-[14px] font-[600]">
                      $58.00
                    </span>
                  </div>
                </td>
                <td class="px-6 py-2">
                  <p className="text-[14px] w-[100%]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={30} type="warning" />
                </td>
                <td class="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                      <AiOutlineEdit
                        size={32}
                        className="text-[rgba(0,0,0,0.7)]"
                      />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                      <FaRegEye size={32} className="text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                      <GoTrash size={32} className="text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr className="odd:bg-white">
                <td class="px-6 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td class="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/8956">
                        <img
                          src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                          alt=""
                          className="w-full object-cover group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                        <Link to="/product/8956">
                          Women Wide Leg High-Rise Light Fade Stretchable Je...
                        </Link>
                      </h3>
                      <span className="text-[12px]">Flying Machine</span>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-2">Fashion</td>
                <td class="px-6 py-2">Women</td>
                <td class="px-6 py-2">
                  <div className="flex  gap-1 flex-col">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[#3872fa] text-[14px] font-[600]">
                      $58.00
                    </span>
                  </div>
                </td>
                <td class="px-6 py-2">
                  <p className="text-[14px] w-[100%]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={30} type="warning" />
                </td>
                <td class="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                      <AiOutlineEdit
                        size={32}
                        className="text-[rgba(0,0,0,0.7)]"
                      />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                      <FaRegEye size={32} className="text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                      <GoTrash size={32} className="text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr className="odd:bg-white">
                <td class="px-6 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td class="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/8956">
                        <img
                          src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                          alt=""
                          className="w-full object-cover group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                        <Link to="/product/8956">
                          Women Wide Leg High-Rise Light Fade Stretchable Je...
                        </Link>
                      </h3>
                      <span className="text-[12px]">Flying Machine</span>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-2">Fashion</td>
                <td class="px-6 py-2">Women</td>
                <td class="px-6 py-2">
                  <div className="flex  gap-1 flex-col">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[#3872fa] text-[14px] font-[600]">
                      $58.00
                    </span>
                  </div>
                </td>
                <td class="px-6 py-2">
                  <p className="text-[14px] w-[100%]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={30} type="warning" />
                </td>
                <td class="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                      <AiOutlineEdit
                        size={32}
                        className="text-[rgba(0,0,0,0.7)]"
                      />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                      <FaRegEye size={32} className="text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                      <GoTrash size={32} className="text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center pt-5 pb-5 px-4">
          <Pagination count={10} color="primary" />
        </div>
      </div>
      <ProductDashboard />

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
              <tr class="bg-white border-b  dark:border-gray-700">
                <td className="px-6 py-4 font-[500]">
                  {" "}
                  <Button
                    onClick={() => isShowOrderProduct(0)}
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                  >
                    {isOpenOrderProduct === 0 ? (
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
                  <span className="text-[#3872fa] font-[600]">
                    25dsfdscee5224fer5
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-[#3872fa] font-[600]">25ddvdr5</span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  Biswajit Biswas
                </td>
                <td className="px-6 py-4 font-[500]">7797756092</td>
                <td className="px-6 py-4 font-[500]">
                  <span className="block w-[400px]">
                    188, Raja Subodh Chandra Mallick Rd, Jadavpur, Kolkata, West
                    Bengal 700032
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">700032</td>
                <td className="px-6 py-4 font-[500]">1500.00</td>
                <td className="px-6 py-4 font-[500]">
                  biswajitbp6092@gmail.com
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-[#3872fa] font-[600]">
                    56vdv5e522e5r23ee
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <Badge status="Delivered" />
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  19-09-2025
                </td>
              </tr>
              {isOpenOrderProduct === 0 && (
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
                          <tr class="bg-white border-b  dark:border-gray-700">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-600">
                                25dsfdscee5224fer5
                              </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              Women Wide Leg High-Rise ...
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                                alt=""
                                className="w-[40px] h-[40px] object-cover overflow-hidden rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              3
                            </td>
                            <td className="px-6 py-4 font-[500]">1500.00</td>
                            <td className="px-6 py-4 font-[500]">1500.00</td>
                          </tr>

                          <tr class="bg-white border-b  dark:border-gray-700">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-600">
                                25dsfdscee5224fer5
                              </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              Women Wide Leg High-Rise ...
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                                alt=""
                                className="w-[40px] h-[40px] object-cover overflow-hidden rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              3
                            </td>
                            <td className="px-6 py-4 font-[500]">1500.00</td>
                            <td className="px-6 py-4 font-[500]">1500.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}

              <tr class="bg-white border-b  dark:border-gray-700">
                <td className="px-6 py-4 font-[500]">
                  {" "}
                  <Button
                    onClick={() => isShowOrderProduct(1)}
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                  >
                    {isOpenOrderProduct === 0 ? (
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
                  <span className="text-[#3872fa] font-[600]">
                    25dsfdscee5224fer5
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-[#3872fa] font-[600]">25ddvdr5</span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  Biswajit Biswas
                </td>
                <td className="px-6 py-4 font-[500]">7797756092</td>
                <td className="px-6 py-4 font-[500]">
                  <span className="block w-[400px]">
                    188, Raja Subodh Chandra Mallick Rd, Jadavpur, Kolkata, West
                    Bengal 700032
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">700032</td>
                <td className="px-6 py-4 font-[500]">1500.00</td>
                <td className="px-6 py-4 font-[500]">
                  biswajitbp6092@gmail.com
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-[#3872fa] font-[600]">
                    56vdv5e522e5r23ee
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <Badge status="Delivered" />
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  19-09-2025
                </td>
              </tr>
              {isOpenOrderProduct === 1 && (
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
                          <tr class="bg-white border-b  dark:border-gray-700">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-600">
                                25dsfdscee5224fer5
                              </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              Women Wide Leg High-Rise ...
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                                alt=""
                                className="w-[40px] h-[40px] object-cover overflow-hidden rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              3
                            </td>
                            <td className="px-6 py-4 font-[500]">1500.00</td>
                            <td className="px-6 py-4 font-[500]">1500.00</td>
                          </tr>

                          <tr class="bg-white border-b  dark:border-gray-700">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-600">
                                25dsfdscee5224fer5
                              </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              Women Wide Leg High-Rise ...
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                                alt=""
                                className="w-[40px] h-[40px] object-cover overflow-hidden rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              3
                            </td>
                            <td className="px-6 py-4 font-[500]">1500.00</td>
                            <td className="px-6 py-4 font-[500]">1500.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
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
          <Line type="monotone" dataKey="Users" stroke="#82ca9d" strokeWidth={3} />
        </LineChart>
      </div>
    </>
  );
};

export default Dashboard;
