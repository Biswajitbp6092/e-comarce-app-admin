import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SearchBox from "../../Component/SearchBox/SearchBox";
import { editData, fetchDataFromApi } from "../../utils/api";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { myContext } from "../../App";
import Pagination from "@mui/material/Pagination";

const Orders = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageOrder, setPageOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const context = useContext(myContext);

  const isShowOrderProduct = (index) => {
    setIsOpenOrderProduct(isOpenOrderProduct === index ? null : index);
  };

  const handleChange = (e, id) => {
    const newStatus = e.target.value;
    const obj = { id, order_status: newStatus };

    editData(`/api/order/order-status/${id}`, obj).then((res) => {
      if (res?.data?.error === false) {
        context.openAlartBox("Success", res?.data?.message);
        fetchOrders();
      }
    });
  };

  const fetchOrders = () => {
    const endpoint = searchQuery
      ? `/api/order/admin/order-list?page=${pageOrder}&limit=7&search=${searchQuery}`
      : `/api/order/admin/order-list?page=${pageOrder}&limit=7`;

    fetchDataFromApi(endpoint).then((res) => {
      if (res?.data?.error === false) {
        setOrders(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      }
    });
  };

  useEffect(() => {
    setPageOrder(1);
  }, [searchQuery]);

  useEffect(() => {
    fetchOrders();
  }, [pageOrder, searchQuery]);

  return (
    <div className="card mt-4 shadow-md sm:rounded-lg bg-white h-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 py-5">
        <h2 className="text-[18px] font-semibold">Recent Orders</h2>

        <div className="w-full sm:w-[40%] md:w-[30%] lg:w-[25%]">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setPageOrder={setPageOrder}
          />
        </div>
      </div>

      <div className="relative overflow-x-auto mt-5 pb-5">
        <table className="w-full text-sm text-left rtl:text-left text-gray-600 dark:text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-600">
            <tr>
              <th scope="col">&nbsp;</th>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
                Order Id
              </th>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
                Payment Id
              </th>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
                Name
              </th>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
                Phone Number
              </th>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
                Address
              </th>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
                Pincode
              </th>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
                Total Amount
              </th>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
                Email
              </th>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
                User Id
              </th>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
                Status
              </th>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
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
                      className="bg-white border-b dark:border-gray-700"
                      key={index}
                    >
                      <td className="px-3 py-3">
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

                      <td className="px-3 py-3 text-[#3872fa] font-[500] whitespace-nowrap">
                        {order?._id}
                      </td>

                      <td className="px-3 py-3 text-[#3872fa] font-[500] whitespace-nowrap">
                        {order?.paymentId || "Cash On Delivery"}
                      </td>

                      <td className="px-3 py-3 whitespace-nowrap font-[500]">
                        {order?.userId?.name}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap font-[500]">
                        {order?.delivery_address?.mobile}
                      </td>

                      <td className="px-3 py-3">
                        <span className="block w-[280px]">
                          {[
                            order?.delivery_address?.address_line,
                            order?.delivery_address?.city,
                            order?.delivery_address?.landmark,
                            order?.delivery_address?.state,
                            order?.delivery_address?.country,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </td>

                      <td className="px-3 py-3">
                        {order?.delivery_address?.pin_code}
                      </td>

                      <td className="px-3 py-3">
                        {order?.totalAmt?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>

                      <td className="px-3 py-3">{order?.userId?.email}</td>

                      <td className="px-3 py-3 text-[#3872fa]">
                        {order?.userId?._id}
                      </td>

                      <td className="px-3 py-3">
                        <Select
                          value={order?.order_status || "pending"}
                          size="small"
                          className="w-full"
                          onChange={(e) => handleChange(e, order?._id)}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="confirm">Confirm</MenuItem>
                          <MenuItem value="delivered">Delivered</MenuItem>
                        </Select>
                      </td>

                      <td className="px-3 py-3 whitespace-nowrap">
                        {order?.createdAt?.split("T")[0]}
                      </td>
                    </tr>

                    {isOpenOrderProduct === index && (
                      <tr>
                        <td colSpan={6} className="pl-20">
                          <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600">
                              <thead className="text-xs bg-gray-50 uppercase">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-3 py-3  whitespace-nowrap"
                                  >
                                    Product Id
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3  whitespace-nowrap"
                                  >
                                    Title
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3  whitespace-nowrap"
                                  >
                                    Image
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3  whitespace-nowrap"
                                  >
                                    Qty
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3  whitespace-nowrap"
                                  >
                                    Price
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3  whitespace-nowrap"
                                  >
                                    Sub Total
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {order?.products?.map((item, index) => (
                                  <tr
                                    key={index}
                                    className="border-b border-[#c5c5c5]"
                                  >
                                    <td className="px-3 py-3">{item?._id}</td>
                                    <td className="px-3 py-3 w-[300px]">
                                      {item?.productTitle}
                                    </td>
                                    <td className="px-3 py-3">
                                      <img
                                        src={item?.image}
                                        className="w-[40px] h-[40px] rounded-md"
                                        alt=""
                                      />
                                    </td>
                                    <td className="px-3 py-3">
                                      {item?.quantity}
                                    </td>
                                    <td className="px-3 py-3">
                                      {item?.price?.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "INR",
                                      })}
                                    </td>
                                    <td className="px-3 py-3">
                                      ₹
                                      {item?.subTotal?.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "INR",
                                      })}
                                    </td>
                                  </tr>
                                ))}
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

      {totalPages > 1 && (
        <div className="flex justify-center mt-2 pb-0">
          <Pagination
            showFirstButton
            showLastButton
            count={totalPages}
            page={pageOrder}
            onChange={(e, value) => setPageOrder(value)}
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
