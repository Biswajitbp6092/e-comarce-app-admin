import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { fetchDataFromApi, postData } from "../../utils/api";
import { useEffect } from "react";
import { useContext } from "react";
import { myContext } from "../../App";

const AddAddress = () => {
  const context = useContext(myContext);
  // const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState(false);

  const [formFields, setFormFields] = useState({
    address_line: "",
    city: "",
    state: "",
    pin_code: "",
    country: "",
    mobile: "",
    status: "",
    userId: context?.userData?._id,
    selected:false
  });

  useEffect(() => {
    if (context?.userData?._id) {
      setFormFields((prevState) => ({
        ...prevState,
        userId: context.userData._id,
      }));
    }
  }, [context?.userData]);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields((prevState) => ({
      ...prevState,
      status: event.target.value,
    }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.address_line === "") {
      context.openAlartBox("Error", "Please Enter Address Line 1");
      setIsLoading(false);
      return false;
    }
    if (formFields.city === "") {
      context.openAlartBox("Error", "Please Enter Your City");
      setIsLoading(false);
      return false;
    }
    if (formFields.state === "") {
      context.openAlartBox("Error", "Please Enter your State");
      setIsLoading(false);
      return false;
    }
    if (formFields.pin_code === "") {
      context.openAlartBox("Error", "Please Enter your Pin Code");
      setIsLoading(false);
      return false;
    }
    if (formFields.country === "") {
      context.openAlartBox("Error", "Please Enter your Country");
      setIsLoading(false);
      return false;
    }
    // if (formFields.mobile === "") {
    //   context.openAlartBox("Error", "Please Enter your Mobile Number");
    //   setIsLoading(false);
    //   return false;
    // }
    if (phone === "") {
      context.openAlartBox("Error", "Please Enter your 10 Digit Phone Number");
      setIsLoading(false);
      return false;
    }

   
    postData(`/api/address/add`, formFields, {
      withCredentials: true,
    }).then((res) => {
     

      if (res?.error !== true) {
        setIsLoading(false);
        context.openAlartBox("Sucess", res?.data?.message);
        context.setIsOppenFullScreenPanel({
          open: false,
        });
        fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
          context?.setAddress(res.data?.data);
        });
      } else {
        context.openAlartBox("Error", res?.data?.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form action="" className="form py-3 p-8" onSubmit={handelSubmit}>
        <div className="grid grid-cols-2 mb-3 gap-4">
          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Address Line 1
            </h3>
            <input
              type="text"
              className="w-full h-[35px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3 text-sm"
              onChange={onChangeInput}
              value={formFields.address_line}
              name="address_line"
            />
          </div>

          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">City</h3>
            <input
              type="text"
              className="w-full h-[35px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3 text-sm"
              onChange={onChangeInput}
              value={formFields.city}
              name="city"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 mb-3 gap-4">
          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">State</h3>
            <input
              type="text"
              className="w-full h-[35px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3 text-sm"
              onChange={onChangeInput}
              value={formFields.state}
              name="state"
            />
          </div>

          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Pin Code</h3>
            <input
              type="text"
              className="w-full h-[35px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3 text-sm"
              onChange={onChangeInput}
              value={formFields.pin_code}
              name="pin_code"
            />
          </div>

          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Country</h3>
            <input
              type="text"
              className="w-full h-[35px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3 text-sm"
              onChange={onChangeInput}
              value={formFields.country}
              name="country"
            />
          </div>

          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Mobile</h3>
            <PhoneInput
              defaultCountry="in"
              value={phone}
              onChange={(value) => {
                setPhone(value);
                setFormFields((prev) => ({ ...prev, mobile: value }));
              }}
              autoFormat
              forceDialCode
              className="w-full border border-[rgba(0,0,0,0.2)] rounded-md"
            />
          </div>
          <div className="col w-[100%]">
            <h3 className="text-[14px] font-[500] mb-1 text-black">Status</h3>
            <Select
              value={status}
              onChange={handleChangeStatus}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
              className="w-full"
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </div>
        </div>

        <div className="w-[250px] mt-4">
          <Button
            type="submit"
            className="btn-blue btn-lg w-full flex gap-2 items-center justify-center"
          >
            <FaCloudUploadAlt className="text-[25px] text-white" />
            {isLoading ? "Publishing..." : "Publish and View"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddAddress;
