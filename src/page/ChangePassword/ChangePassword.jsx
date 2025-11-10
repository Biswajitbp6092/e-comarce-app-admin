import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";

import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { myContext } from "../../App.jsx";
import { postData } from "../../utils/api.js";
import CircularProgress from "@mui/material/CircularProgress";

const ChangePassword = () => {
  const [isPasswordShow, setisPasswordShow] = useState(false);
  const [isPasswordShow2, setisPasswordShow2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    email: localStorage.getItem("userEmail"),
    newPassword: "",
    confirmPassword: "",
  });

  const context = useContext(myContext);
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => ({
      ...formFields,
      [name]: value,
    }));
  };

  const validValue = formFields.newPassword && formFields.confirmPassword;

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.newPassword === "") {
      context.openAlartBox("Error", "Please Enter New password");
      setIsLoading(false);
      return false;
    }
    if (formFields.confirmPassword === "") {
      context.openAlartBox("Error", "Please Enter confirm password");
      setIsLoading(false);
      return false;
    }
    if (formFields.newPassword !== formFields.confirmPassword) {
      context.openAlartBox(
        "Error",
        "Password and Confirm password must be same"
      );
      setIsLoading(false);
      return false;
    }

    postData(`/api/user/reset-password`, formFields).then((res) => {
      console.log(res);
      if (res?.error === false) {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");
        setIsLoading(false);
        navigate("/login");
        context.openAlartBox("Sucess", res?.message);
      } else {
        context.openAlartBox("Error", res?.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <section className="bg-[#fff] w-full">
      <header className="w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50">
        <Link to="/">
          <img src="/logo.jpg" alt="" className="w-[200px]" />
        </Link>
        <div className="flex items-center gap-0">
          <NavLink to="/login" exact={true} activeClassName="isActive">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-2">
              <CgLogIn size={14} />
              Login
            </Button>
          </NavLink>

          <NavLink to="/sign-up" exact={true} activeClassName="isActive">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-2">
              <FaRegUser size={14} />
              Sign up
            </Button>
          </NavLink>
        </div>
      </header>
      <img
        src="./patarn.jpg"
        alt=""
        className="w-full fixed top-0 left-0 opacity-1.5"
      />
      <div className="loginBox card w-[600px] h-auto pb-25 mx-auto pt-20 relative z-50">
        <div className="text-center">
          <img src="/logo.jpg" alt="" className="m-auto" />
        </div>
        <h1 className="text-center text-[35px] font-[800] mt-4">
          Welcome Back! <br />
          <span className="text-[#3872fa]">
            You can change your Passworm rom here
          </span>
        </h1>

        <br />

        <form action="" className="w-full px-8 mt-3" onSubmit={handelSubmit}>
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">New Password</h4>
            <div className="relative w-full">
              <input
                type={isPasswordShow ? "text" : "password"}
                className="w-full px-4 h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-0 "
                name="newPassword"
                value={formFields.newPassword}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
              <Button
                onClick={() => setisPasswordShow(!isPasswordShow)}
                className="!absolute top-[10px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600"
              >
                {isPasswordShow === true ? (
                  <FaRegEye size={16} />
                ) : (
                  <FaEyeSlash size={16} />
                )}
              </Button>
            </div>
          </div>

          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Confrim Password</h4>
            <div className="relative w-full">
              <input
                type={isPasswordShow2 ? "text" : "password"}
                className="w-full px-4 h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-0 "
                name="confirmPassword"
                value={formFields.confirmPassword}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
              <Button
                onClick={() => setisPasswordShow2(!isPasswordShow2)}
                className="!absolute top-[10px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-600"
              >
                {isPasswordShow2 === true ? (
                  <FaRegEye size={16} />
                ) : (
                  <FaEyeSlash size={16} />
                )}
              </Button>
            </div>
          </div>

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
              "Change Password"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
