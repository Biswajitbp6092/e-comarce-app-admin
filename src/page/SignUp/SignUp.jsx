import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  function handleClickGoogle() {
    setLoadingGoogle(true);
  }
  const [loadingFb, setLoadingFb] = useState(false);
  function handleClickFb() {
    setLoadingFb(true);
  }

  const [isPasswordShow, setisPasswordShow] = useState();
  function handelClickShowPassword() {
    setisPasswordShow(!isPasswordShow);
  }
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
          Join us today! get special <br />{" "}
          <span className="text-[#3872fa]">benifits and stay up-to-date</span>
        </h1>
        <div className="flex items-center justify-center w-full mt-5 gap-4">
          <Button
            size="small"
            onClick={handleClickGoogle}
            endIcon={<FcGoogle size={24} />}
            loading={loadingGoogle}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !py-2  !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
          >
            Sign in with Google
          </Button>

          <Button
            size="small"
            onClick={handleClickFb}
            endIcon={<FaFacebook size={24} className="text-blue-600" />}
            loading={loadingFb}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
          >
            Sign in with Facebook
          </Button>
        </div>

        <br />
        <div className="w-full flex items-center justify-center gap-3">
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
          <span className="text-[14px] font-[500]">
            or sign in with your email
          </span>
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
        </div>
        <br />

        <form action="" className="w-full px-8 mt-3">
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Full Name</h4>
            <input
              type="text"
              className="w-full px-4 h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-0 "
            />
          </div>

          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Email</h4>
            <input
              type="email"
              className="w-full px-4 h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-0 "
            />
          </div>

          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Password</h4>
            <div className="relative w-full">
              <input
                type={isPasswordShow ? "text" : "password"}
                className="w-full px-4 h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-0 "
              />
              <Button
                onClick={handelClickShowPassword}
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

          <div className="form-group mb-4 w-full flex items-center justify-between">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember me"
            />
            <Link
              to="forgot-password"
              className="text-[#3872fa] font-[600] text-[15px] hover:underline"
            >
              Forgot Password
            </Link>
          </div>
          <Button className="btn-blue btn-lg w-full">Sign Up</Button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
