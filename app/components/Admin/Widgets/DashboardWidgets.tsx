import React, { FC } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { Box, CircularProgress } from "@mui/material";
import { PiUsersFourLight } from "react-icons/pi";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "success" : "warning"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open, value }) => {
  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-8 bg-[#f8f8f8] dark:bg-[#1C1C1C] rounded-lg shadow-md">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="pt-[40px] pr-8 space-y-6">
          <div className="w-full bg-[#111C43] rounded-lg shadow-md p-5">
            <div className="flex items-center">
              <BiBorderLeft className="text-[#45CBA0] dark:text-[#45CBA0] text-[30px]" />
              <div className="ml-4">
                <h5 className="font-Poppins text-white text-[18px]">120</h5>
                <h5 className="py-2 font-Poppins text-[#45CBA0] text-[14px] font-normal">
                  Doanh thu đạt được
                </h5>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <CircularProgressWithLabel value={100} open={open} />
              <h5 className="text-center pt-4 text-white">+120%</h5>
            </div>
          </div>
          <div className="w-full bg-[#111C43] rounded-lg shadow-md p-5">
            <div className="flex items-center">
              <PiUsersFourLight className="text-[#45CBA0] dark:text-[#45CBA0] text-[30px]" />
              <div className="ml-4">
                <h5 className="font-Poppins text-white text-[18px]">450</h5>
                <h5 className="py-2 font-Poppins text-[#45CBA0] text-[14px] font-normal">
                  Thành viên mới
                </h5>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <CircularProgressWithLabel value={100} open={open} />
              <h5 className="text-center pt-4 text-white">+150%</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
