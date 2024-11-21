import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, LabelList } from 'recharts';
import Loader from '../../Loader/Loader';
import { useGetCoursesAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { style } from '@/app/styles/style';

type Props = {
  isDashboard: boolean;
};

const CourseAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});
  const analyticsData: any[] = [];

  const monthsInVietnamese = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const formatToVietnameseDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const month = date.getMonth();
      const year = date.getFullYear();
      return `${monthsInVietnamese[month]}, ${year}`;
    } catch {
      return dateString;
    }
  };

  if (data?.course?.last12Months) {
    data.course.last12Months.forEach((item: any) => {
      analyticsData.push({
        name: formatToVietnameseDate(item.month), // Chuyển tháng sang tiếng Việt
        uv: item.count,
      });
    });
  }

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`h-screen ${isDashboard ? 'pl-10' : 'pl-20'}`}>
          <div className="mt-[50px]">
            <h1 className={`${style.title} px-5 ${isDashboard ? 'text-center' : 'text-start'}`}>
              Biểu đồ khóa học
            </h1>
          </div>
          <div className={`w-full ${isDashboard ? 'h-[30%]' : 'h-[90%]'} flex items-center justify-center`}>
            <ResponsiveContainer width={isDashboard ? '80%' : '90%'} height={isDashboard ? '100%' : '50%'}>
              <BarChart width={150} height={300} data={analyticsData}>
                <defs>
                  <linearGradient id="gradientColor" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4facfe" stopOpacity={1} />
                    <stop offset="100%" stopColor="#00f2ea" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#4facfe" />
                <YAxis domain={[minValue, 'auto']} stroke="#4facfe" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', color: '#fff' }}
                  formatter={(value: number) => [`${value}`, 'Số khóa học']}
                  labelFormatter={(label: string) => `${label}`}
                />
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
};

export default CourseAnalytics;
