"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import EditHero from "../../components/Admin/Customization/EditHero";
import { Edit } from "lucide-react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Code Guru - Admin"
          description="Code Guru là mộ nền tảng giúp bạn cải thiện kỹ năng của mình bằng những bài học và sự giúp đỡ từ giáo viên"
          keywords="Programmings,MeRN,Redux,Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16px] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <EditHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
