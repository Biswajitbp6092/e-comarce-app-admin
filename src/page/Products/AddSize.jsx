import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { myContext } from "../../App";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AddSize = () => {
  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState("");

  const context = useContext(myContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetchDataFromApi("/api/product/productSize/Sizelist").then((res) => {
      if (res?.error !== false) {
        setData(res?.data?.data);
      }
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (name === "") {
      context.openAlartBox("Error", "Please Enter Product RAMS");
      return;
    }

    if (editId === "") {
      postData(`/api/product/productSize/create`, {
        name: name,
      }).then((res) => {
        if (res?.error === false) {
          context.openAlartBox("Sucess", res?.message);
          setTimeout(() => {
            setIsLoading(false);
            getData();
            setName("");
          }, [300]);
        } else {
          context.openAlartBox("Error", res?.message);
        }
      });
    }

    if (editId !== "") {
      editData(`/api/product/productSize/${editId}`, { name: name }).then(
        (res) => {
          if (res?.data?.error === false) {
            context.openAlartBox("Sucess", res?.data?.message);
            setTimeout(() => {
              setIsLoading(false);
              setName("");
              setEditId("");
              getData();
            }, [300]);
          } else {
            context.openAlartBox("Error", res?.data?.message);
          }
        }
      );
    }
  };

  const deleteItem = (id) => {
    deleteData(`/api/product/productSize/${id}`).then((res) => {
      getData();
      context.openAlartBox("Sucess", "Item Deleted");
    });
  };

  const editItem = (id) => {
    fetchDataFromApi(`/api/product/productSize/${id}`).then((res) => {
      setName(res?.data?.data?.name);
      setEditId(res?.data?.data?._id);
    });
  };
  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-2">
        <h2 className="text-[18px] font-[600]">Add Products Size </h2>
      </div>

      <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-full lg:w-[65%]">
        <form action="" className="form py-3 p-6" onSubmit={handelSubmit}>
          <div className="col mb-5">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Products Size
            </h3>
            <input
              type="text"
              className="w-full h-[35px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px] text-white" />
                Publish and View
              </>
            )}
          </Button>
        </form>
      </div>
      {data?.length !== 0 && (
        <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-full lg:w-[65%]">
          <div className="relative overflow-x-auto mt-5 pb-5">
            <table className="w-full text-sm text-left rtl:text-left text-gray-600 dark:text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100  dark:text-gray-600">
                <tr>
                  <th scope="col" className="px-6 py-3" width="10%">
                    <div className="w-[60px]">
                      <Checkbox {...label} size="small" />
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="px-0 py-3 whitespace-nowrap"
                    width="60%"
                  >
                    Products Size
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 whitespace-nowrap"
                    width="30%"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr className="odd:bg-white" key={index}>
                      <td className="px-6 py-2">
                        <div className="w-[60px]">
                          <Checkbox {...label} size="small" />
                        </div>
                      </td>

                      <td className="px-0 py-2">
                        <span className="font-[600]">{item?.name}</span>
                      </td>

                      <td className="px-6 py-2">
                        <div className="flex items-center gap-1">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                            onClick={() => editItem(item?._id)}
                          >
                            <AiOutlineEdit
                              size={32}
                              className="text-[rgba(0,0,0,0.7)]"
                            />
                          </Button>

                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                            onClick={() => deleteItem(item?._id)}
                          >
                            <GoTrash
                              size={32}
                              className="text-[rgba(0,0,0,0.7)]"
                            />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {/* odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AddSize;
