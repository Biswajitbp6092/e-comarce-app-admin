import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./page/Dashboard/Dashboard";
import Header from "./Component/Header/Header";
import Sidebar from "./Component/Sidebar/Sidebar";
import { createContext, useState } from "react";
import Login from "./page/Login/Login";
import SignUp from "./page/SignUp/SignUp";
import Products from "./page/Products/Products";
const myContext = createContext();

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IoClose } from "react-icons/io5";
import Slide from "@mui/material/Slide";
import AddProducts from "./Component/AddProducts/AddProducts";
import HomeSliderBanner from "./page/HomeSliderBanner/HomeSliderBanner";
import AddHomeSlide from "./page/HomeSliderBanner/AddHomeSlide";
import CategoryList from "./page/Category/CategoryList";
import AddCategory from "./page/Category/AddCategory";
import SubCategoryList from "./page/Category/SubCategoryList";
import AddSubCategory from "./page/Category/AddSubCategory";
import Users from "./page/Users/Users";
import Orders from "./page/Orders/Orders";
import ForgotPassword from "./page/ForgotPassword/ForgotPassword";
import VerifyAccount from "./page/VerifyAccount/VerifyAccount";
import ChangePassword from "./page/ChangePassword/ChangePassword";

import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";
import { useEffect } from "react";
import Profile from "./page/Profile/Profile";
import AddAddress from "./page/AddAddress/AddAddress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
   const [address, setAddress] = useState([]);

  const [isOppenFullScreenPanel, setIsOppenFullScreenPanel] = useState({
    open: false,
    model: "product",
  });

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sideBarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-1"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path: "/login",
      exact: true,
      element: (
        <>
          <Login />
        </>
      ),
    },

    {
      path: "/forgot-password",
      exact: true,
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },
    {
      path: "/verify-account",
      exact: true,
      element: (
        <>
          <VerifyAccount />
        </>
      ),
    },
    {
      path: "/change-password",
      exact: true,
      element: (
        <>
          <ChangePassword />
        </>
      ),
    },

    {
      path: "/sign-up",
      exact: true,
      element: (
        <>
          <SignUp />
        </>
      ),
    },

    {
      path: "/products",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sideBarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-1"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Products />
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path: "/homeslider/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sideBarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-1"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <HomeSliderBanner />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/category/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sideBarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-1"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <CategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/subcategory/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sideBarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-1"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <SubCategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/orders",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sideBarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-1"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Orders />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/profile",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sideBarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-1"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Profile />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sideBarWrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-1"
                } transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Users />
              </div>
            </div>
          </section>
        </>
      ),
    },
  ]);

  const openAlartBox = (status, msg) => {
    if (status === "Sucess") {
      toast.success(msg);
    }
    if (status === "Error") {
      toast.error(msg);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);
      fetchDataFromApi(`/api/user/user-details`).then((res) => {
        setUserData(res?.data?.data);
        if (res?.data?.data?.error === true) {
          if (res?.data?.data?.message === "you habe not login") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            openAlartBox("Error", "your Sesion is closed please login again");
            window.location.href="/login"
          }
        }
      });
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isOppenFullScreenPanel,
    setIsOppenFullScreenPanel,
    openAlartBox,
    userData,
    setUserData,
    setAddress,
    address
  };

  return (
    <>
      <myContext.Provider value={values}>
        <RouterProvider router={router} />

        <Dialog
          fullScreen
          open={isOppenFullScreenPanel.open}
          onClose={() =>
            setIsOppenFullScreenPanel({
              open: false,
            })
          }
          slots={{
            transition: Transition,
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setIsOppenFullScreenPanel({ open: false })}
                aria-label="close"
              >
                <IoClose className="text-gray-800" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className="text-gray-800">
                  {isOppenFullScreenPanel.model}
                </span>
              </Typography>
            </Toolbar>
          </AppBar>
          {isOppenFullScreenPanel.model === "Add Product" && <AddProducts />}
          {isOppenFullScreenPanel.model === "Add Home Slider" && (
            <AddHomeSlide />
          )}
          {isOppenFullScreenPanel.model === "Add New Category" && (
            <AddCategory />
          )}
          {isOppenFullScreenPanel.model === "Add New Sub Category" && (
            <AddSubCategory />
          )}
          {isOppenFullScreenPanel.model === "Add New Address" && (
            <AddAddress  />
          )}
        </Dialog>
        <Toaster />
      </myContext.Provider>
    </>
  );
}

export default App;
export { myContext };
