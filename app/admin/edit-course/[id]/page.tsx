"use client";
import React from "react";
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../../app/utils/Heading";
import CreateCourse from "../../../components/Admin/Course/CreateCourse";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import EditCourse from "@/app/components/Admin/Course/EditCourse";

type Props = {}
const page = ({ params }: any) => {
    const id = params?.id
    return (
        <div>
            <Heading
                title="CodeGuru - Tạo khóa học"
                description="CodeGuru đây là nền tảng dành cho học sinh tham gia các khóa học, bên cạnh việc học còn được các thầy cô hỗ trợ"
                keywords="Programming, MERN, Redux, Machine Learning"
            />
            <div className="flex h-[100vh]">
                <div className="1500px:w-[15%] w-1/5">
                    <AdminSidebar />
                </div>
                <div className="w-[85%] h-full overflow-auto">
                    <DashboardHeader />
                    <EditCourse id={id} />
                </div>
            </div>
        </div>
    );
};

export default page;
