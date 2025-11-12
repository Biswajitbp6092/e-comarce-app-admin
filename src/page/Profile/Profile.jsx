import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { FaCloudUploadAlt } from "react-icons/fa";
import { editData, postData, uploadImage } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Collapse } from "react-collapse";

import TextField from "@mui/material/TextField";

const Profile = () => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [isChangePassowrdFormShow, setIsChangePassowrdFormShow] =
    useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const context = useContext(myContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      navigate("/login");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name || "",
        email: context?.userData?.email || "",
        mobile: String(context?.userData?.mobile || "").trim(),
      });

      setChangePassword({
        email: context?.userData?.email || "",
      });
    }
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => ({
      ...formFields,
      [name]: value,
    }));

    setChangePassword(() => ({
      ...formFields,
      [name]: value,
    }));
  };

  const validValue = Object.values(formFields).every((el) => el);

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlartBox("Error", "Please Enter Your name");
      setIsLoading(false);
      return false;
    }
    if (formFields.email === "") {
      context.openAlartBox("Error", "Please Enter email id");
      setIsLoading(false);
      return false;
    }
    if (formFields.mobile === "") {
      context.openAlartBox("Error", "Please Enter your mobile number");
      setIsLoading(false);
      return false;
    }

    editData(`/api/user/${userId}`, formFields, {
      withCredentials: true,
    }).then((res) => {
      console.log(res);

      if (res?.error !== true) {
        setIsLoading(false);
        context.openAlartBox("Sucess", res?.data?.message);
      } else {
        context.openAlartBox("Error", res?.data?.message);
        setIsLoading(false);
      }
    });
  };

  const validValue2 = Object.values(formFields).every((el) => el);

  const handelSubmitChangePassword = (e) => {
    e.preventDefault();
    setIsLoading2(true);

    if (changePassword.oldPassword === "") {
      context.openAlartBox("Error", "Please Enter Your Old password");
      setIsLoading2(false);
      return false;
    }
    if (changePassword.newPassword === "") {
      context.openAlartBox("Error", "Please Enter New Password");
      setIsLoading2(false);
      return false;
    }
    if (changePassword.confirmPassword === "") {
      context.openAlartBox("Error", "Please Enter Confirm Password");
      setIsLoading2(false);
      return false;
    }
    if (changePassword.confirmPassword !== changePassword.newPassword) {
      context.openAlartBox(
        "Error",
        "New Password and Confirm Password do not match"
      );
      setIsLoading2(false);
      return false;
    }

    postData(`/api/user/change-password`, changePassword, {
      withCredentials: true,
    }).then((res) => {
      if (res?.error !== true) {
        setIsLoading2(false);
        context.openAlartBox("Sucess", res?.message);
      } else {
        context.openAlartBox("Error", res?.message);
        setIsLoading2(false);
      }
    });
  };

  useEffect(() => {
    const userAvatar = [];
    if (
      context?.userData?.avatar !== "" &&
      context?.userData?.avatar !== undefined
    ) {
      userAvatar.push(context?.userData?.avatar);
      setPreviews(userAvatar);
    }
  }, [context?.userData]);

  let selectedImages = [];

  const formData = new FormData();

  const onChangeFile = async (e, apiEndpoint) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);
      console.log(files);

      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];
          selectedImages.push(file);
          formData.append("avatar", file);
        } else {
          context.openAlartBox(
            "Error",
            "please select a valid JPG,PNG or webp image file"
          );
          setUploading(false);
          return false;
        }

        uploadImage("/api/user/user-avatar", formData).then((res) => {
          setUploading(false);
          let avatar = [];
          console.log(res?.data?.avatar);
          avatar.push(res?.data?.avatar);
          setPreviews(avatar);
          console.log(res);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card my-4 pt-5 w-[65%] shadow-md sm:rounded-lg bg-white px-5 pb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Users Profile</h2>

          <Button
            className="!ml-auto"
            onClick={() =>
              setIsChangePassowrdFormShow(!isChangePassowrdFormShow)
            }
          >
            Change Password
          </Button>
        </div>
        <br />
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200">
          {uploading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              {previews?.length !== 0 ? (
                previews?.map((img, index) => (
                  <img
                    src={img}
                    key={index}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ))
              ) : (
                <img
                  src="/user.svg"
                  alt="default avatar"
                  className="w-full h-full object-cover"
                />
              )}
            </>
          )}

          <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all ease-linear group-hover:opacity-100">
            <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
            <input
              type="file"
              className="absolute top-0 lrft-0 w-full h-full opacity-0"
              accept="image/*"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
              name="avatar"
            />
          </div>
        </div>

        <form action="" className="form mt-8" onSubmit={handelSubmit}>
          <div className="flex items-center gap-5">
            <div className="w-[50%]">
              <input
                type="text"
                className="w-full h-[35px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3"
                name="name"
                value={formFields.name}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
            </div>

            <div className="w-[50%]">
              <input
                className="bg-[#f1f1f1] cursor-not-allowed w-full h-[35px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md p-3"
                label="E-mail"
                type="email"
                variant="outlined"
                size="small"
                name="email"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
                readOnly
              />
            </div>
          </div>

          <div className="flex items-center mt-4 gap-5">
            <div className="w-[50%]">
              <PhoneInput
                defaultCountry="in"
                value={formFields.mobile}
                onChange={(phone) =>
                  setFormFields((prev) => ({ ...prev, mobile: phone }))
                }
                autoFormat={true}
                forceDialCode={true}
                disableDialCodePrefill={false}
                className="w-full border border-[rgba(0,0,0,0.2)] rounded-md"
              />
            </div>
          </div>
          <br />
          <div
            className="flex items-center justify-center p-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1f1f1] hover:bg-[#e7f3f9] cursor-pointer"
            onClick={() =>
              context.setIsOppenFullScreenPanel({
                open: true,
                model: "Add New Address",
              })
            }
          >
            <span className="text-[14px] font-[500]">Add Address</span>
          </div>
          <br />
          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={!validValue}
              className="btn-blue btn-lg w-full"
            >
              {isLoading ? (
                <CircularProgress
                  color="inherit"
                  style={{ width: "20px", height: "20px" }}
                />
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </div>

      <Collapse isOpened={isChangePassowrdFormShow}>
        <div className="card w-[65%] bg-white p-5 shadow-md rounded-md">
          <div className="flex items-center pb-3">
            <h2 className="pb-0 text-[18px] font-[600]">Change Password</h2>
          </div>
          <hr />

          <form
            action=""
            className="mt-8"
            onSubmit={handelSubmitChangePassword}
          >
            <div className="flex items-center gap-5">
              <div className="w-[50%]">
                <TextField
                  label="Old Password"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="oldPassword"
                  value={changePassword.oldPassword}
                  disabled={isLoading2 === true ? true : false}
                  onChange={onChangeInput}
                />
              </div>

              <div className="w-[50%]">
                <TextField
                  type="text"
                  label="New Password"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="newPassword"
                  value={changePassword.newPassword}
                  onChange={onChangeInput}
                />
              </div>
            </div>

            <div className="flex items-center mt-4 gap-5">
              <div className="w-[50%]">
                <TextField
                  label="confirm Password"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="confirmPassword"
                  value={changePassword.confirmPassword}
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <br />
            <div className="my-2">
              <Link to={"/login"}>Forgot Password</Link>
            </div>
            <div className="flex items-center gap-4">
              <Button
                type="submit"
                disabled={!validValue2}
                className="btn-blue btn-lg w-full"
              >
                {isLoading2 ? (
                  <CircularProgress
                    color="inherit"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Collapse>
    </>
  );
};

export default Profile;
