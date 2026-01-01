import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { myContext } from "../../App";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteData, editData } from "../../utils/api";

const EditSubCatBox = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [selectval, setSelectval] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const context = useContext(myContext);

  useEffect(() => {
    formFields.name = props?.name;
    formFields.parentCatName = props?.parentCatName;
    formFields.parentId = props?.parentId;
    setSelectval(props?.selectedCat);
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    const catId = selectval;
    setSelectval(catId);

    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const handelChange = (event) => {
    setSelectval(event.target.value);
    formFields.parentId = event.target.value;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlartBox("Error", "Please Enter category name");
      setIsLoading(false);
      return false;
    }
    editData(`/api/category/${props?.id}`, formFields).then((res) => {

      setTimeout(() => {
        // context.openAlartBox("Sucess", res?.data?.message);
        context.openAlartBox("Sucess", "category Updated Succesfuly");
        context?.getCat();
        setIsLoading(false);
      }, 1000);
    });
  };
  const deleteCat = (id) => {
    deleteData(`/api/category/${id}`).then((res) => {
      context?.getCat();
    });
  };

  return (
    <form
      action=""
      className="w-[100%] flex items-center gap-3 p-0 md:px-4"
      onSubmit={handelSubmit}
    >
      {editMode === true && (
        <>
          <div className="flex w-full md:w-auto flex-col md:flex-row md:items-center justify-between py-2 gap-4">
            <div className="w-full md:w-[85%]">
              <Select
                style={{ zoom: "100%" }}
                className="w-full"
                size="small"
                value={selectval}
                onChange={handelChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {props?.catData?.length !== 0 &&
                  props?.catData?.map((item, index) => {
                    return (
                      <MenuItem
                        value={item?._id}
                        key={index}
                        onClick={() => {
                          formFields.parentCatName = item?.name;
                        }}
                      >
                        {item?.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <input
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
              name="name"
              value={formFields?.name}
              onChange={onChangeInput}
            />
            <div className="flex items-center gap-3">
              <Button
                size="small"
                className="btn-sml"
                type="submit"
                variant="contained"
              >
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <>Edit</>
                )}
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
      {editMode === false && (
        <>
          <span className="font-[500] text-[14px]">{props?.name}</span>
          <div className="flex items-center ml-auto gap-3">
            <Button
              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black mr-auto"
              onClick={() => setEditMode(true)}
            >
              <MdOutlineModeEdit />
            </Button>
            <Button
              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black"
              onClick={() => deleteCat(props?.id)}
            >
              <FaRegTrashAlt />
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default EditSubCatBox;
