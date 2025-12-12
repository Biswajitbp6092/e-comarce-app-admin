import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { RiMenu2Fill } from "react-icons/ri";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { myContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import AddProducts from "../AddProducts/AddProducts";
import AddHomeSlide from "../../page/HomeSliderBanner/AddHomeSlide";
import AddCategory from "../../page/Category/AddCategory";
import AddSubCategory from "../../page/Category/AddSubCategory";
import AddAddress from "../../page/AddAddress/AddAddress";
import EditCategory from "../../page/Category/EditCategory";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IoClose } from "react-icons/io5";
import Slide from "@mui/material/Slide";
import EditProducts from "../AddProducts/EditProducts";
import AddBannerV1 from "../../page/Banners/AddBannerV1";
import EditBannerV1 from "../../page/Banners/EditBannerV1";
import AddBlog from "../../page/Blog/AddBlog";
import EditBlog from "../../page/Blog/EditBlog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 5,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const context = useContext(myContext);
  const navigate = useNavigate();

  const logout = () => {
    setAnchorMyAcc(null);
    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      {
        withCredentials: true,
      }
    ).then((res) => {
      if (res?.data.error === false) {
        context.setIsLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }
    });
  };

  return (
    <>
      <header
        className={`w-full h-[auto] py-2 ${
          context.isSidebarOpen === true ? "pl-74" : "pl-5"
        } transition-all ease-linear shadow-md pr-7 bg-[#ffffff] flex items-center justify-between fixed top-0 left-0 z-50`}
      >
        <div className="part1">
          <Button
            onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}
            className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]"
          >
            <RiMenu2Fill size={22} className="text-[rgba(0,0,0,0.8)]" />
          </Button>
        </div>

        <div className="part-2 w-[40%] flex items-center justify-end gap-5">
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={4} color="secondary">
              <FaRegBell />
            </StyledBadge>
          </IconButton>
          {context.isLogin === true ? (
            <div className="relative">
              <div
                className="w-[35px] h-[35px] rounded-full overflow-hidden cursor-pointer"
                onClick={handleClickMyAcc}
              >
                <img
                  src="https://ecme-react.themenate.net/img/avatars/thumb-1.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <Menu
                anchorEl={anchorMyAcc}
                id="account-menu"
                open={openMyAcc}
                onClose={handleCloseMyAcc}
                onClick={handleCloseMyAcc}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleCloseMyAcc} className="!bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-[35px] h-[35px] rounded-full overflow-hidden cursor-pointer">
                      <img
                        src="https://ecme-react.themenate.net/img/avatars/thumb-1.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="info">
                    <h3 className="text-[15px] font-[500] leading-4">
                      {context.userData?.name}
                    </h3>
                    <p className="text-[13px] font-[400] opacity-75">
                      {context.userData?.email}
                    </p>
                  </div>
                </MenuItem>
                <Divider />
                <Link to={"/profile"}>
                  <MenuItem
                    onClick={handleCloseMyAcc}
                    className="flex items-center gap-3"
                  >
                    <FaRegUser size={16} />
                    <span>Profile</span>
                  </MenuItem>
                </Link>

                <MenuItem onClick={logout} className="flex items-center gap-3">
                  <PiSignOutBold size={18} />
                  <span>Sign Out</span>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login">
              <Button className="btn-blue btn-sm !rounded-full !capitalize">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </header>

      <Dialog
        fullScreen
        open={context?.isOppenFullScreenPanel.open}
        onClose={() =>
          context?.setIsOppenFullScreenPanel({
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
              onClick={() =>
                context?.setIsOppenFullScreenPanel({ open: false })
              }
              aria-label="close"
            >
              <IoClose className="text-gray-800" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-gray-800">
                {context?.isOppenFullScreenPanel.model}
              </span>
            </Typography>
          </Toolbar>
        </AppBar>
        {context?.isOppenFullScreenPanel.model === "Add Product" && (
          <AddProducts />
        )}
        {context?.isOppenFullScreenPanel.model === "Add Home Slider" && (
          <AddHomeSlide />
        )}
        {context?.isOppenFullScreenPanel.model === "Add New Category" && (
          <AddCategory />
        )}
        {context?.isOppenFullScreenPanel.model === "Add New Sub Category" && (
          <AddSubCategory />
        )}
        {context?.isOppenFullScreenPanel.model === "Add New Address" && (
          <AddAddress />
        )}
        {context?.isOppenFullScreenPanel.model === "Edit Category" && (
          <EditCategory />
        )}
        {context?.isOppenFullScreenPanel.model === "Edit Products" && (
          <EditProducts />
        )}
        {context?.isOppenFullScreenPanel.model === "Add bannerV1" && (
          <AddBannerV1 />
        )}
        {context?.isOppenFullScreenPanel.model === "Edit BannerV1" && (
          <EditBannerV1 />
        )}
        {context?.isOppenFullScreenPanel.model === "Add Blog" && <AddBlog />}
        {context?.isOppenFullScreenPanel.model === "Edit Blog" && <EditBlog />}
      </Dialog>
    </>
  );
};

export default Header;
