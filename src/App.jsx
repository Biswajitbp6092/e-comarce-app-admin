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


import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoClose } from "react-icons/io5";
import Slide from '@mui/material/Slide';
import AddProducts from "./Component/AddProducts/AddProducts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isOppenFullScreenPanel, setIsOppenFullScreenPanel] = useState({
    open: false,
    model:'product'
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




  ]);
  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isOppenFullScreenPanel,
    setIsOppenFullScreenPanel
  };

  return (
    <>
      <myContext.Provider value={values}>
        <RouterProvider router={router} />


         <Dialog
        fullScreen
        open={isOppenFullScreenPanel.open}
        onClose={()=> setIsOppenFullScreenPanel({
          open:false,
        })}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=> setIsOppenFullScreenPanel({open:false})}
              aria-label="close"
            >
              <IoClose  className="text-gray-800"/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-gray-800">{isOppenFullScreenPanel.model}</span>
            </Typography>
            
          </Toolbar>
        </AppBar>
        {isOppenFullScreenPanel.model==='Add Product' && <AddProducts/>}
        
      </Dialog>


      </myContext.Provider>
    </>
  );
}

export default App;
export { myContext };
