import React from 'react'
import { BarChart, Bar, ResponsiveContainer, XAxis, Label, YAxis, LabelList } from 'recharts';
import Loader from '../../Loader/Loader';
import { useGetCoursesAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { style } from '@/app/styles/style';

type Props = {}

const CourseAnalytics = (props: Props) => {
  const {data, isLoading} = useGetCoursesAnalyticsQuery({});
  const analyticsData: any[] = [];

  if (data?.course?.last12Months) {
    data.course.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });
  }

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${style.title} px-5 !text-start`}>
              Biểu đồ khóa học
            </h1>
            <p className={`${style.label} px-5`}>
              Dữ liệu của 12 tháng gần nhất
            </p>
          </div>
          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <defs>
                  {/* Định nghĩa Gradient */}
                  <linearGradient id="gradientColor" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4facfe" stopOpacity={1} />  {/* Xanh dương sáng */}
                    <stop offset="100%" stopColor="#00f2ea" stopOpacity={1} /> {/* Xanh lá tươi */}
                  </linearGradient>
                </defs>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="url(#gradientColor)">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseAnalytics;
