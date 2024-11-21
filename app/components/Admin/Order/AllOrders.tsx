import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import Loader from "../../Loader/Loader";
import { format, register } from "timeago.js";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderAPI";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseAPI";
import { AiOutlineMail } from "react-icons/ai";
import { Box } from "@mui/material"; // Thay thế
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

type Props = {
    isDashboard?: boolean;
};

const AllOrders = ({ isDashboard }: Props) => {
    const { theme } = useTheme();
    const { isLoading, data } = useGetAllOrdersQuery({});
    const { data: usersData } = useGetAllUsersQuery({});
    const { data: coursesData } = useGetAllCoursesQuery({});

    const [orderData, setOrderData] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            const users = usersData?.users || [];
            const courses = coursesData?.courses || [];
            const temp = data.orders.map((item: any) => {
                const user = users.find((user: any) => user._id === item.userId);
                const course = courses.find((course: any) => course._id === item.courseId);
                console.log("check coursesData.courses: ", coursesData.courses)
                console.log("check courses: ", courses)
                return {
                    ...item,
                    userName: user?.name || "Không rõ tên",
                    userEmail: user?.email || "Không rõ email",
                    title: course?.name || "Không rõ tên khóa học",
                    price: course?.price ? `${course.price}đ` : "Không rõ giá",
                };
            });
            setOrderData(temp);
        }
    }, [data, usersData, coursesData]);

    const columns: any = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "userName", headerName: "Họ và tên", flex: 0.5 },
        ...(isDashboard
            ? []
            : [
                { field: "userEmail", headerName: "Email", flex: 1 },
                { field: "title", headerName: "Tên khóa học", flex: 1 },
            ]),
        { field: "price", headerName: "Giá tiền", flex: 0.5 },
        ...(isDashboard
            ? [
                { field: "created_at", headerName: "Ngày mua", flex: 0.5 },
            ]
            : [
                {
                    field: "emailAction",
                    headerName: "Email",
                    flex: 0.2,
                    renderCell: (params: any) => (
                        <a href={`mailto:${params.row.userEmail}`}>
                            <AiOutlineMail className="text-black dark:text-white" size={20} />
                        </a>
                    ),
                },
            ]),
    ];

    const rows = orderData.map((item: any) => ({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt, "vi-VI"),
    }));

    const localeText = {
        noRowsLabel: "Không có dữ liệu",
        noResultsOverlayLabel: "Không tìm thấy kết quả",
        errorOverlayDefaultLabel: "Có lỗi xảy ra",
        footerRowSelected: (count: number) => `${count} khóa học được chọn`,
        footerTotalRows: "Tổng số khóa học:",
        footerPage: "Trang",
        footerPaginationRowsPerPage: "Khóa học mỗi trang:",
        footerPaginationButton: "Đi",
    };

    register("vi-VI", (_number, index) => {
        const timeString = [
            ["vừa xong", "một lúc"],
            ["%s giây trước", "trong %s giây"],
            ["1 phút trước", "trong 1 phút"],
            ["%s phút trước", "trong %s phút"],
            ["1 giờ trước", "trong 1 giờ"],
            ["%s giờ trước", "trong %s giờ"],
            ["1 ngày trước", "trong 1 ngày"],
            ["%s ngày trước", "trong %s ngày"],
            ["1 tuần trước", "trong 1 tuần"],
            ["%s tuần trước", "trong %s tuần"],
            ["1 tháng trước", "trong 1 tháng"],
            ["%s tháng trước", "trong %s tháng"],
            ["1 năm trước", "trong 1 năm"],
            ["%s năm trước", "trong %s năm"],
        ];
        return timeString[index];
    });

    return (
        <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
            {isLoading ? (
                <Loader />
            ) : (
                <Box m={isDashboard ? 0 : "40px"}>
                    <Box
                        m={isDashboard ? 0 : "40px 0 0 0"}
                        height={isDashboard ? "35vh" : "90vh"}
                        sx={{
                            "& .MuiDataGrid-root": { border: "none" },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: theme === "dark" ? "#ccc" : "#A4A9FC",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                            },
                        }}
                    >
                        <DataGrid
                            checkboxSelection={!isDashboard}
                            rows={rows}
                            columns={columns}
                            localeText={localeText}
                            components={!isDashboard ? { Toolbar: GridToolbar } : undefined}
                        />
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default AllOrders;
