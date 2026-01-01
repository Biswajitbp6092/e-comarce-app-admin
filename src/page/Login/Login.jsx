import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";

import { useContext } from "react";
import { myContext } from "../../App";
import { postData } from "../../utils/api";

const Login = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFb, setLoadingFb] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isPasswordShow, setisPasswordShow] = useState();

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const context = useContext(myContext);
  const navigate = useNavigate();

  function handleClickGoogle() {
    setLoadingGoogle(true);
  }

  function handleClickFb() {
    setLoadingFb(true);
  }

  function handelClickShowPassword() {
    setisPasswordShow(!isPasswordShow);
  }

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => ({
      ...formFields,
      [name]: value,
    }));
  };

  const validValue = Object.values(formFields).every((el) => el);

  const forGotPassword = (e) => {
    e.preventDefault();
    if (formFields.email === "") {
      context.openAlartBox("Error", "Please Enter email id to reset password");
      return false;
    } else {
      context.openAlartBox(
        "Sucess",
        `We have sent a password reset link to ${formFields.email}`
      );
      localStorage.setItem("userEmail", formFields.email);
      localStorage.setItem("actionType", "forgotPassword");

      postData("/api/user/forgot-password", {
        email: formFields.email,
      }).then((res) => {
        if (res?.error === false) {
          context.openAlartBox("Sucess", res?.message);
          navigate("/verify-account");
        } else {
          context.openAlartBox("Error", res?.message);
        }
      });
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.email === "") {
      context.openAlartBox("Error", "Please Enter email id");
      return false;
    }
    if (formFields.password === "") {
      context.openAlartBox("Error", "Please Enter password");
      return false;
    }

    postData("/api/user/login", formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.error !== true) {
          setIsLoading(false);
          context.openAlartBox("Sucess", res?.message);

          setFormFields({
            email: "",
            password: "",
          });

          // localStorage.setItem("userEmail", formFields.email);
          localStorage.setItem("accessToken", res?.data?.accessToken);
          localStorage.setItem("refreshToken", res?.data?.refreshToken);

          context.setIsLogin(true);

          navigate("/");
        } else {
          context.openAlartBox("Error", res?.message);
          setIsLoading(false);
        }
      }
    );
  };
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT – LOGIN FORM */}
      <div className="flex items-center justify-center px-3 py-3 lg:px-6 bg-white">
        <div className="w-full max-w-lg">
          <img src="/logo.png" alt="Logo" className="w-32 mb-5" />

          <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-1">
            Welcome Back!
          </h1>
          <p className="text-gray-500 mb-6 text-sm md:text-base">
            Sign in to access your dashboard and continue optimizing your QA
            process
          </p>

          <form className="space-y-3" onSubmit={handelSubmit}>
            <div>
              <label className="text-sm md:text-md font-bold text-gray-700">Email</label>
              <input
                type="email"
                className="w-full h-[46px] bg-white px-4 mt-1 rounded-lg border-1 border-[#0f766e] focus:outline-none "
                name="email"
                placeholder="Enter your email"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
            </div>

            <div>
              <label className="text-sm md:text-md font-bold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={isPasswordShow ? "text" : "password"}
                  name="password"
                  value={formFields.password}
                  disabled={isLoading === true ? true : false}
                  onChange={onChangeInput}
                  placeholder="Enter your password"
                  className="w-full h-[46px] px-4 mt-1 rounded-lg border-1 border-[#0f766e] focus:outline-none "
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

            <div className="flex justify-between items-center text-sm">
              <div></div>
              <Link
                to="#"
                onClick={forGotPassword}
                className="text-[#0f766e] font-medium hover:underline"
              >
                Forgot Password
              </Link>
            </div>

            <Button
              type="submit"
              disabled={!validValue}
              className="w-full h-[50px] !rounded-lg !bg-[#0f766e] !text-white font-semibold cursor-pointer hover:!bg-[#0d605c] mt-4"
            >
              {isLoading ? <CircularProgress /> : "Sign In"}
            </Button>

            <div className="w-full flex items-center justify-center gap-3 mt-3 mb-3">
              <span className="flex items-center w-[250px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
              <span className="text-base">OR</span>
              <span className="flex items-center w-[250px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
            </div>

            <Button
              fullWidth
              onClick={handleClickGoogle}
              startIcon={<FcGoogle size={24} />}
              loading={loadingGoogle}
              loadingPosition="end"
              variant="outlined"
              className="!h-[48px] !rounded-lg !capitalize !text-[#0f766e] !border-[#0f766e]"
            >
              Sign in with Google
            </Button>

            <Button
              fullWidth
              onClick={handleClickFb}
              startIcon={<FaFacebook size={24} className="text-[#0f766e]" />}
              loading={loadingFb}
              loadingPosition="end"
              variant="outlined"
              className="!h-[48px] !rounded-lg !capitalize !mt-2 !text-[#0f766e] !border-[#0f766e]"
            >
              Sign in with Facebook
            </Button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/sign-up" className="text-[#0f766e] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT – TESTIMONIALS */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-br from-[#083344] via-[#0f766e] to-[#134e4a] text-white">
        <h2 className="text-4xl font-bold mb-6">
          Revolutionize QA with <br /> Smarter Automation
        </h2>

        <p className="text-white/80 text-lg mb-10">
          “SoftQA has completely transformed our testing process. It’s reliable,
          efficient, and ensures releases are always top-notch.”
        </p>

        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/60"
            className="w-12 h-12 rounded-full"
            alt=""
          />
          <div>
            <p className="font-semibold">Michael Carter</p>
            <p className="text-sm text-white/70">
              Software Engineer at DevCore
            </p>
          </div>
        </div>

        <div className="mt-16 opacity-70 text-sm">
          Trusted by teams at
          <div className="flex gap-6 mt-4 flex-wrap">
            <span>Discord</span>
            <span>Mailchimp</span>
            <span>Grammarly</span>
            <span>Dropbox</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
