import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./page/Dashboard/Dashboard";
import Header from "./Component/Header/Header";
import Sidebar from "./Component/Sidebar/Sidebar";
import { createContext, useState } from "react";
import Login from "./page/Login/Login";
import SignUp from "./page/SignUp/SignUp";
const myContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

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
      path: "/sign-up",
      exact: true,
      element: (
        <>
          <SignUp />
        </>
      ),
    },
  ]);
  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
  };

  return (
    <>
      <myContext.Provider value={values}>
        <RouterProvider router={router} />
      </myContext.Provider>
    </>
  );
}

export default App;
export { myContext };
