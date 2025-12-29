import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaUsers } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { TbCategoryPlus } from "react-icons/tb";
import { TbBrandProducthunt } from "react-icons/tb";




const DashboardBoxes = (props) => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
          <div className="box p-5 bg-white cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <FaUsers className="text-[40px] text-[#3872fa]" />
            <div className="info w-[70%]">
              <h3>Total Users</h3>
              <b>{props?.users}</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-[#3872fa]" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box p-5 bg-white  cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <IoMdCart className="text-[40px] text-[#10b981]" />
            <div className="info w-[70%]">
              <h3>Total Orders</h3>
              <b>{props?.orders}</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-[#10b981]" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box p-5 bg-white  cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <TbCategoryPlus  className="text-[50px] text-[#7928ca]" />
            <div className="info w-[70%]">
              <h3>Total Category</h3>
              <b>{props?.category}</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-[#7928ca]" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box p-5 bg-white  cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <TbBrandProducthunt className="text-[50px] text-[#312be1d8]"/>
            <div className="info w-[70%]">
              <h3>Total Products</h3>
              <b>{props?.products}</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-[#312be1d8]" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default DashboardBoxes;
