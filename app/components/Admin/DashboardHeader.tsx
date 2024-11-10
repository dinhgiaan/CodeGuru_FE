"use client";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import React, { FC, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TiTick } from "react-icons/ti";

type Props = {};

const DashboardHeader: FC<Props> = () => {
  const [open, setOpen] = useState(false);

  const toggleNotifications = () => setOpen(!open);

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={toggleNotifications}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          3
        </span>
      </div>
      {open && (
        <div className="w-[380px] h-[50vh] dark:bg-[#1e293b] bg-white shadow-2xl absolute top-16 right-0 z-10 rounded-md overflow-hidden transition-all duration-300">
          <h5 className="text-center text-[20px] font-semibold text-black dark:text-white p-3 border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            Thông báo
          </h5>
          <div className="dark:bg-[#2d3a4ea1] bg-[#f0f4f8] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] transition-transform duration-300">
            <div className="w-full flex items-center justify-between p-3 hover:bg-[#e5e7eb] dark:hover:bg-[#374151] transition-colors rounded-md">
              <p className="text-black dark:text-yellow-400">Thông báo mới</p>
              <p className="text-black dark:text-green-500 cursor-pointer flex items-center">
                Đánh dấu đã đọc <TiTick className="ml-1" />
              </p>
            </div>
            <p className="px-3 text-black dark:text-white text-sm">
              Đinh Gia Ân vừa tham gia cộng đồng CodeGuru, hãy gửi lời chào đến bạn ấy.
            </p>
            <p className="p-3 text-black dark:text-white text-[14px] opacity-60">
              1 ngày trước
            </p>
          </div>

          <div className="dark:bg-[#2d3a4ea1] bg-[#f0f4f8] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] transition-transform duration-300">
            <div className="w-full flex items-center justify-between p-3 hover:bg-[#e5e7eb] dark:hover:bg-[#374151] transition-colors rounded-md">
              <p className="text-black dark:text-yellow-400">Thông báo mới</p>
              <p className="text-black dark:text-green-500 cursor-pointer flex items-center">
                Đánh dấu đã đọc <TiTick className="ml-1" />
              </p>
            </div>
            <p className="px-3 text-black dark:text-white text-sm">
              Đinh Gia Ân vừa bình luận về một khóa học, hãy xem và trả lời.
            </p>
            <p className="p-3 text-black dark:text-white text-[14px] opacity-60">
              1 ngày trước
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardHeader;