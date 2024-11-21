"use client";
import React from "react";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import EditCategories from "../../components/Admin/Customization/EditCategories";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Code Guru - Danh mục"
          description="Code Guru là mộ nền tảng giúp bạn cải thiện kỹ năng của mình bằng những bài học và sự giúp đỡ từ giáo viên"
          keywords="Programmings,MeRN,Redux,Machine Learning"
        />
        <div className="flex h-full">
          <div className="1500px:w-[16px] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] pb-10">
            <DashboardHero />
            <EditCategories />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
