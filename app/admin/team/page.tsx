"use client";
import React from "react";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar"; // Fixed the import path
import AdminProtected from "@/app/hooks/adminProtected";
import DashboardHero from "@/app/components/Admin/DashboardHero"; // Fixed the import path
import AllUsers from "@/app/components/Admin/Users/AllUsers";

const Page: React.FC = () => {
  return (
    <AdminProtected>
      <Heading
        title='CodeGuru - Quản lý đội ngũ'
        description='CodeGuru là trang web cung cấp các khóa học đa dạng'
        keywords='Programming, MERN, Redux, LMS'
      />
      <div className="flex h-[100vh]">
        <div className="1500px:w-[15%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%] h-full overflow-auto">
          <DashboardHero />
          <AllUsers isTeam={true} />
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
