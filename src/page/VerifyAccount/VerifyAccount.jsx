import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import OtpBox from "../../Component/OtpBox/OtpBox";
import { myContext } from "../../App";

import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(myContext);
  const navigate = useNavigate();

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const verifyOTP = (e) => {
    e.preventDefault();

    if (otp !== "") {
      setIsLoading(true);
      const actionType = localStorage.getItem("actionType");

      if (actionType !== "forgotPassword") {
        postData("/api/user/verifyEmail", {
          email: localStorage.getItem("userEmail"),
          otp: otp,
        }).then((res) => {
          if (res?.error === false) {
            context.openAlartBox("Sucess", res?.message);
            localStorage.removeItem("userEmail");
            setIsLoading(false);
            navigate("/login");
          } else {
            context.openAlartBox("Error", res?.message);
            setIsLoading(false);
          }
        });
      } else {
        postData("/api/user/verify-forgot-password-otp", {
          email: localStorage.getItem("userEmail"),
          otp: otp,
        }).then((res) => {
          if (res?.error === false) {
            context.openAlartBox("Sucess", res?.message);
            navigate("/change-password");
          } else {
            context.openAlartBox("Error", res?.message);
            setIsLoading(false);
          }
        });
      }
    } else {
      context.openAlartBox("Error", "Please enter OTP");
    }
  };

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
          <img src="verify.png" alt="" className="w-[100px] m-auto" />
        </div>
        <h1 className="text-center text-[35px] font-[800] mt-4">
          Welcome Back! <br />
          <span className="text-[#3872fa]">Please Verify Your Email</span>
        </h1>

        <br />
        <p className="text-center text-[15px]">
          OTP Send to &nbsp;
          <span className="text-[#3872fa] font-bold">
            {localStorage.getItem("userEmail")}
          </span>
        </p>
        <br />
        <form onSubmit={verifyOTP}>
          <div className="text-center flex items-center justify-center flex-col">
            <OtpBox length={6} onChange={handleOtpChange} />
          </div>

          <br />

          <div className="w-[300px] m-auto">
            <Button type="submit" className="btn-blue w-full">
              {isLoading === true ? (
                <CircularProgress
                  color="inherit"
                  style={{ width: "20px", height: "20px" }}
                />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VerifyAccount;
