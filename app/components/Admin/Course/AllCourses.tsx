import React, { useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from '../../Loader/Loader';
import { useGetAllCoursesQuery } from '@/redux/features/course/courseAPI';
import { format } from 'timeago.js';
import { FiEdit2 } from 'react-icons/fi';

type Props = {}

const AllCourses = (props: Props) => {
    const { theme, setTheme } = useTheme();
    const { isLoading, data, error } = useGetAllCoursesQuery({});
    const [isCollapsed, setIsCollapsed] = useState(false);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Tên khóa học", flex: 1 },
        { field: "rating", headerName: "Lượt đánh giá", flex: 0.5 },
        { field: "purchased", headerName: "Số học viên", flex: 0.5 },
        { field: "created_at", headerName: "Ngày tạo", flex: 0.5 },
        {
            field: " ",
            headerName: "Sửa",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button>
                            <FiEdit2 className="dark:text-white text-black" size={20} />
                        </Button>
                    </>
                );
            },
        },
        {
            field: " ",
            headerName: "Xóa",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button>
                            <AiOutlineDelete className="dark:text-white text-black" size={20} />
                        </Button>
                    </>
                );
            },
        },
    ];

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

    const rows: any = [];
    if (data && data.course) {
        data.course.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                rating: item.rating,
                purchased: item.purchased,
                created_at: format(item.createdAt, 'vi'),
            })
        });
    }

    return (
        <div className='mt-[120px] ml-[150px]'>
            {
                isLoading
                    ?
                    (<Loader />)
                    : (
                        <Box m="20px"
                            sx={{
                                width: "80%", maxWidth: "1200px", padding: "20px", borderRadius: 0.2, bgcolor: '#3a90a1',
                            }
                            }>
                            <Box
                                height="70vh"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    overflowY: "auto",
                                    "& .MuiDataGrid-root": {
                                        border: "none",
                                        outline: "none",
                                    },
                                    "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect_icon": {
                                        color: theme === "dark" ? "#fff" : "#000",
                                    },
                                    "& .MuiDataGrid-sortIcon": {
                                        color: theme === "dark" ? "#fff" : "#000",
                                    },
                                    "& .MuiDataGrid-row ": {
                                        color: theme === "dark" ? "#fff" : "#000", //text
                                        borderBottom:
                                            theme === "dark"
                                                ? "1px solid #ffffff30!important"
                                                : "1px solid #245bc9!important",
                                    },
                                    "& .MuiTablePagination-root": {
                                        color: theme === "dark" ? "#e8e8e8" : "#fff", //rows per page
                                    },
                                    "& .MuiDataGrid-cell": {
                                        borderBottom: "none",
                                    },
                                    "& .name-column--cell": {
                                        color: theme === "dark" ? "#fff" : "#000",
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: theme === "dark" ? "#cfcaca" : "#A4A9FC",
                                        borderBottom: "none",
                                        color: theme === "dark" ? "" : "#000",
                                    },
                                    "& .MuiDataGrid-virtualScroller": {
                                        color: theme === "dark" ? "#1F2A40" : "#F2F0F0", // text title header
                                    },
                                    "& .MuiDataGrid-footerContainer": {
                                        backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC", // color footer
                                        borderTop: "none",
                                        color: theme === "dark" ? "#fff" : "#000",
                                    },
                                    "& .MuiCheckBox-root": {
                                        color:
                                            theme === "dark" ? `#b7ebde !important` : `#000 !important `,
                                    },
                                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                        color: `#ff0000 !important`,
                                    },
                                }}
                            >
                                <DataGrid checkboxSelection rows={rows} columns={columns} localeText={localeText} />
                            </Box>
                        </Box>
                    )
            }
        </div>
    )
}

export default AllCourses