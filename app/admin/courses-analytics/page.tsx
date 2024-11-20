'use client'
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar"
import CourseAnalytics from "../../components/Admin/Analytics/CourseAnalytics";
import DashboardHero from "@/app/components/Admin/DashboardHero";


type Props = {}

const page = (props: Props) => {
  return (
    <div>
            <Heading
                    title="CodeGuru - Tạo khóa học"
                    description="CodeGuru đây là nền tảng dành cho học sinh tham gia các khóa học, bên cạnh việc học còn được các thầy cô hỗ trợ"
                    keywords="Programming, MERN, Redux, Machine Learning"
                />
                <div className="flex h-screen">
                    <div className="1500px:w-[15%] w-1/5">
                        <AdminSidebar />
                    </div>
                    <div className="w-[85%] ">
                        <DashboardHero/>
                        <CourseAnalytics />
                    </div>
                </div>

            </div>
    
  )
}

export default page