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
import HomeSliderBanner from "./page/HomeSliderBanner/HomeSliderBanner";
import CategoryList from "./page/Category/CategoryList";
import SubCategoryList from "./page/Category/SubCategoryList";
import Users from "./page/Users/Users";
import Orders from "./page/Orders/Orders";
import ForgotPassword from "./page/ForgotPassword/ForgotPassword";
import VerifyAccount from "./page/VerifyAccount/VerifyAccount";
import ChangePassword from "./page/ChangePassword/ChangePassword";
import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";
import { useEffect } from "react";
import Profile from "./page/Profile/Profile";
import ProductsDetails from "./page/Products/ProductsDetails";
import AddRams from "./page/Products/AddRams";
import AddWeight from "./page/Products/AddWeight";
import AddSize from "./page/Products/AddSize";
import BannerV1List from "./page/Banners/BannerV1List";
import Blog from "./page/Blog/Blog";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);
  const [catData, setCatData] = useState([]);

  const [isOppenFullScreenPanel, setIsOppenFullScreenPanel] = useState({
    open: false,
    id: "",
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
      path: "/product/:id",
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
                <ProductsDetails />
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
    {
      path: "/product/add-rams",
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
                <AddRams />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/add-weight",
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
                <AddWeight />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/add-size",
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
                <AddSize />
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path: "/banner/list",
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
                <BannerV1List />
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path: "/blog/list",
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
                <Blog />
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
            window.location.href = "/login";
          }
        }
      });
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    getCat();
  }, []);

  const getCat = () => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res?.data?.data);
    });
  };

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
    address,
    catData,
    setCatData,
    getCat,
  };

  return (
    <>
      <myContext.Provider value={values}>
        <RouterProvider router={router} />

        <Toaster />
      </myContext.Provider>
    </>
  );
}

export default App;
export { myContext };
