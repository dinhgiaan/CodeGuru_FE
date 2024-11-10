"use client";
import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
} from "./Icon";
import avatarDefault from "../../../../public/assets/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { course } from '@/app/styles/course';

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
  className: string;
}
const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setlogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }
  const logoutHandler = () => {
    setlogout(true);
  };
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${theme === "dark" ? "#111C43 !important" : "#8abab6 !important"
            }`,
        },
        "&.pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: `${theme === "dark" ? "#61cc5e !important" : "#cc8041 !important"}`,
        },
        "& .pro-menu-item.active": {
          color: "#04d832 !important",
        },
        "&.pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme === "dark" ? "#f2eded !important" : "#ffffff !important"
            }`,
        },
      }}
      className="bg-white dark:bg-[#e3ff43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "19%",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="7px"
              >
                <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black font-semibold">
                  CodeGuru
                </h3>

                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1] ml-24" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="! text-[20px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ m: "10px 0 0 0" }}
                  className="! text-[20px] text-black dark:text-[#ffffffc1] capitalize"
                >
                  - {user?.role} -
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Bảng điều khiển"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              className={`${course.font}`}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="text-[15px] text-[#720be0c1] dark:text-[#22f6f9c1] capitalize ! font-[400]"
            >
              {!isCollapsed && "DỮ LIỆU"}
            </Typography>
            <Item
              title="Người dùng"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
              className={`${course.font}`}
            />

            <Item
              title="Hóa đơn"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              className={`${course.font}`}
            />

            <Typography
              variant="h5"
              className="text-[15px] text-[#720be0c1] dark:text-[#22f6f9c1] capitalize ! font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "NỘI DUNG"}
            </Typography>
            <Item
              title="Tạo khóa học"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
              className={`${course.font}`}
            />
            <Item
              title="Các khóa học hiện có"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
              className={`${course.font}`}
            />
            <Typography
              variant="h5"
              className="text-[15px] text-[#720be0c1] dark:text-[#22f6f9c1] capitalize ! font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "TÙY CHỈNH"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
              className={`${course.font}`}
            />

            <Item
              title="FAQ"
              to="/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
              className={`${course.font}`}
            />
            <Item
              title="Các danh mục"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
              className={`${course.font}`}
            />

            <Typography
              variant="h5"
              className="text-[15px] text-[#720be0c1] dark:text-[#22f6f9c1] capitalize ! font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "ĐIỀU KHIỂN"}
            </Typography>
            <Item
              title="Quản lý đội ngũ"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              className={`${course.font}`}
            />

            <Typography
              variant="h6"
              className="text-[15px] text-[#720be0c1] dark:text-[#22f6f9c1] capitalize ! font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "PHÂN TÍCH"}
            </Typography>
            <Item
              title="Phân tích khóa học"
              to="/admin/courses-analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              className={`${course.font}`}
            />
            <Item
              title="Phân tích hóa đơn"
              to="/admin/orders-analytics"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              className={`${course.font}`}
            />
            <Item
              title="Phân tích người dùng"
              to="/admin/users-analytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
              className={`${course.font}`}
            />

            <Typography
              variant="h6"
              className="text-[15px] text-[#720be0c1] dark:text-[#22f6f9c1] capitalize ! font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "LỰA CHỌN KHÁC"}
            </Typography>
            <Item
              title="Cài đặt"
              to="/admin/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
              className={`${course.font}`}
            />
            <div onClick={logoutHandler}>
              <Item
                title="Đăng xuất"
                to="/"
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={setSelected}
                className={`${course.font}`}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
