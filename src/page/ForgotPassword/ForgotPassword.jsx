import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";


const ForgotPassword = () => {
  return (
    <section className="bg-[#fff] w-full h-[100vh]">
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
          Having trouble Sign in? <br />
          Rest your password.
        </h1>

        <br />

        <form action="" className="w-full px-8 mt-3">
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Email</h4>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-0 "
            />
          </div>

          <Button className="btn-blue btn-lg w-full">Reset Password</Button>
          <div className="text-center flex items-center justify-center gap-4 mt-4">
            <span>Don't want to Reset</span>
            <Link
              to="forgot-password"
              className="text-[#3872fa] font-[600] text-[15px] hover:underline"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
