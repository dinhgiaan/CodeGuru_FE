"use client";
import React from "react";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import DashboardHero from "../../components/Admin/DashboardHero";
import AllUsers from "@/app/components/Admin/Users/AllUsers";

type Props = {};

const page = (Props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title='CodeGuru - Quản lý học viên'
          description='CodeGuru là trang web cung cấp các khóa học đa dạng'
          keywords='Programming, MERN, Redux, LMS'
        />
        <div className="flex h-[100vh]">
          <div className="1500px:w-[15%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] h-full overflow-auto">
            <DashboardHero />
            <AllUsers />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;