import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { style } from "@/app/styles/style";
import Loader from "../../Loader/Loader";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const analyticsData: any[] = [];

  if (data?.users?.last12Months) {
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`w-full ${
            !isDashboard
              ? "mt-[50px]"
              : "mt-[50px] bg-gradient-to-r from-[#937f7f] to-[#96a3a3] dark:bg-[#111C43] shadow-lg rounded-lg p-5 bg-no-repeat bg-fixed"
          }`}
        >
          <div className={`mb-4 ${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${style.title} ${
                isDashboard && "!text-[20px]"
              } text-2xl text-gray-800 dark:text-white px-5 !text-start`}
            >
              Biểu đồ người dùng
            </h1>
            {!isDashboard && (
              <p
                className={`${style.label} text-gray-600 dark:text-gray-300 px-5`}
              >
                Dữ liệu của 12 tháng gần nhất
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? "h-[300px]" : "h-[400px]"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height="100%"
            >
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
                  {/* Định nghĩa Gradient với màu sáng */}
                  <linearGradient
                    id="gradientColor"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#4facfe" stopOpacity={1} />
                    <stop offset="100%" stopColor="#00f2ea" stopOpacity={1} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="name" stroke="#4facfe" />
                <YAxis stroke="#4facfe" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#4facfe"
                  fill="url(#gradientColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
