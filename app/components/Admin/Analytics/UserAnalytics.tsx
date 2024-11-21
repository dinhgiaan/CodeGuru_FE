import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { style } from '@/app/styles/style';
import Loader from '../../Loader/Loader';

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});
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

  if (data?.users?.last12Months) {
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({
        name: formatToVietnameseDate(item.month),
        uv: item.count,
      });
    });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`w-full ${!isDashboard ? 'mt-[10px] pl-20' : 'mt-[50px] bg-[#d6d5d5] dark:bg-[#111C43] shadow-lg rounded-lg p-5'}`}>
          <div className={`mb-4 ${isDashboard ? '!ml-8 mb-5' : ''}`}>
            <h1 className={`${style.title} ${isDashboard && '!text-[20px]'} text-2xl text-gray-800 dark:text-white px-5 !text-center`}>
              Biểu đồ người dùng
            </h1>
          </div>

          <div className={`w-full ${isDashboard ? 'h-[300px]' : 'h-[400px]'} flex items-center justify-center`}>
            <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height="100%">
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="gradientColor" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4facfe" stopOpacity={1} />
                    <stop offset="100%" stopColor="#00f2ea" stopOpacity={1} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="name" stroke="#4facfe" label={{ value: 'Ngày', position: 'insideBottomRight', offset: -10 }} />
                <YAxis stroke="#4facfe" label={{ value: 'Số người dùng', angle: -90, position: 'insideLeft', offset: -10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', color: '#fff' }}
                  formatter={(value: number) => [`${value}`, 'Số người dùng']}
                  labelFormatter={(label: string) => `${label}`}
                />
                <Area type="monotone" dataKey="uv" stroke="#4facfe" fill="url(#gradientColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
