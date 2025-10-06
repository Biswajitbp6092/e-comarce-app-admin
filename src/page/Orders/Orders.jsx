import React, { useState } from "react";
import Button from "@mui/material/Button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Badge from "../../Component/Badge/Badge";
import SearchBox from "../../Component/SearchBox/SearchBox";

const Orders = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };
  return (
    <div className="card my-4 shadow-md sm:rounded-lg bg-white">
      <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        <div className="w-[40%]"><SearchBox/></div>
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
              <td className="px-6 py-4 font-[500]">biswajitbp6092@gmail.com</td>
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
              <td className="px-6 py-4 font-[500]">biswajitbp6092@gmail.com</td>
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
  );
};

export default Orders;
