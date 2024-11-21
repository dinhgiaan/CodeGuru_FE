import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import Loader from "../../Loader/Loader";
import { register } from "timeago.js";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderAPI";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseAPI";
import { AiOutlineMail } from "react-icons/ai";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";

type Props = {
    isDashboard?: boolean;
};

const AllOrders = ({ isDashboard }: Props) => {
    const { theme } = useTheme();
    const { isLoading, data } = useGetAllOrdersQuery({});
    const { data: usersData } = useGetAllUsersQuery({});
    const { data: coursesData } = useGetAllCoursesQuery({});

    const [orderData, setOrderData] = useState<any[]>([]);

    // custom date format function
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    //custom price
    const formatVND = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    useEffect(() => {
        if (data) {
            const users = usersData?.users || [];
            const courses = coursesData?.courses || [];
            const orders = data.orders || [];
            const temp = data.orders.map((item: any) => {
                const user = users.find((user: any) => user._id === item.userId);
                const course = courses.find((course: any) => course._id === item.courseId);
                // console.log("check coursesData.courses: ", coursesData.courses)
                // console.log("check courses: ", courses)
                // console.log("check date: ", data)
                return {
                    ...item,
                    userName: user?.name || "Không rõ tên",
                    userEmail: user?.email || "Không rõ email",
                    title: course?.name || "Không rõ tên khóa học",
                    price: course?.price || "Không rõ giá",
                    created_at: orders?.createdAt || "Không rõ ngày mua"
                };
            });
            setOrderData(temp);
        }
    }, [data, usersData, coursesData]);

    const columns: any = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "userName", headerName: "Họ và tên", flex: 0.3 },
        ...(isDashboard
            ? []
            : [
                { field: "userEmail", headerName: "Email", flex: 0.6 },
                { field: "title", headerName: "Tên khóa học", flex: .5 },
            ]),
        { field: "price", headerName: "Giá tiền", flex: 0.5 },
        ...(isDashboard
            ? [
                { field: "created_at", headerName: "Ngày mua", flex: 0.5 },
            ]
            : [
                { field: "created_at", headerName: "Ngày mua", flex: 0.5 },
                {
                    field: "emailAction",
                    headerName: "Email",
                    flex: 0.2,
                    renderCell: (params: any) => (
                        <a href={`mailto:${params.row.userEmail}`} className="flex justify-center items-center mt-3">
                            <AiOutlineMail className="text-black dark:text-white" size={25} />
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
        price: formatVND(item.price),
        created_at: formatDate(new Date(item.createdAt)),
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

    // export CSV
    const csvData = orderData.map((item) => ({
        ID: item._id,
        "Họ và tên": item.userName,
        Email: item.userEmail,
        "Tên khóa học": item.title,
        "Giá tiền": formatVND(item.price),
        "Ngày mua": formatDate(new Date(item.createdAt)),
    }));
    const headers = [
        { label: "ID", key: "ID" },
        { label: "Họ và tên", key: "Họ và tên" },
        { label: "Email", key: "Email" },
        { label: "Tên khóa học", key: "Tên khóa học" },
        { label: "Giá tiền", key: "Giá tiền" },
        { label: "Ngày mua", key: "Ngày mua" },
    ];

    return (
        <div className={!isDashboard ? "mt-[20px] w-[85%] ml-[150px]" : "mt-[0px]"}>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {!isDashboard && (
                        <div className="flex items-center">
                            <CSVLink
                                data={csvData}
                                headers={headers}
                                filename="codeguru_orders.csv"
                                target="_blank"
                                className="ml-11 mt-4 flex items-center space-x-2 bg-[#4bb8eb] text-[18px] py-2 px-6 rounded-sm text-[#fff]"
                            >
                                <FaFileCsv />
                                <span>In ra file</span>
                            </CSVLink>
                        </div>
                    )}

                    <Box m={isDashboard ? 0 : "40px"}>
                        <Box
                            m={isDashboard ? 0 : "40px 0 0 0"}
                            height={isDashboard ? "35vh" : "90vh"}
                            sx={{
                                "& .MuiDataGrid-root": { border: "none" },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: theme === "dark" ? "#d9d7d7" : "#A4A9FC",
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                },
                                "& .MuiDataGrid-row ": {
                                    color: theme === "dark" ? "#d9d7d7" : "#000", //text
                                    borderBottom:
                                        theme === "dark"
                                            ? "1px solid #ffffff30!important"
                                            : "1px solid #245bc9!important",
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
                </>
            )}
        </div>
    );
};

export default AllOrders;
