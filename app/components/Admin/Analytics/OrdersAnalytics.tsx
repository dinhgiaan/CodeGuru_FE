import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { style } from '@/app/styles/style';
import Loader from '../../Loader/Loader';

type Props = {
  isDashboard?: boolean;
};

const OrdersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});
  const analyticsData: any[] = [];

  const monthsInVietnamese = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const formatToVietnameseDate = (dateString: string) => {
    try {
      const date = new Date(dateString); // Chuyển chuỗi ngày thành đối tượng Date
      const month = date.getMonth(); // Lấy chỉ số tháng (0 - 11)
      const year = date.getFullYear(); // Lấy năm
      return `${monthsInVietnamese[month]}, ${year}`; // Định dạng theo tiếng Việt
    } catch {
      return dateString; // Nếu có lỗi, trả lại chuỗi gốc
    }
  };

  if (data?.order?.last12Months) {
    data.order.last12Months.forEach((item: any) => {
      analyticsData.push({
        name: formatToVietnameseDate(item.month),
        count: item.count,
      });
    });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`w-full ${!isDashboard ? 'mt-[10px] pl-20' : 'mt-[50px] bg-[#9e99c9] dark:bg-[#111C43] shadow-lg rounded-lg p-5'}`}>
          <div className={`mb-4 ${isDashboard ? '!ml-8 mb-5' : ''}`}>
            <h1 className={`${style.title} ${isDashboard && '!text-[20px]'} text-2xl text-gray-800 dark:text-white px-5 !text-center`}>
              Biểu đồ lượt mua khóa học
            </h1>
          </div>

          <div className={`w-full ${isDashboard ? 'h-[300px]' : 'h-[400px]'} flex items-center justify-center`}>
            <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height="100%">
              <LineChart
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
                <YAxis stroke="#4facfe" label={{ value: 'Số lượt mua', angle: -90, position: 'insideLeft', offset: -10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', color: '#fff' }}
                  formatter={(value: number) => [`${value}`, 'Lượt mua']}
                  labelFormatter={(label: string) => `${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#4facfe"
                  strokeWidth={3}
                  fill="url(#gradientColor)"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersAnalytics;
