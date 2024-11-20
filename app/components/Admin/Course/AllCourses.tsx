import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from '../../Loader/Loader';
import { useDeleteCourseMutation, useGetAllCoursesQuery, useGetUsersAllCoursesQuery } from '@/redux/features/course/courseAPI';
import { format, register } from 'timeago.js';
import { FiEdit2 } from 'react-icons/fi';
import { style } from '@/app/styles/style';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Props = {}

const AllCourses = (props: Props) => {
    const { theme, setTheme } = useTheme();
    const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const [open, setOpen] = useState(false);
    const [courseId, setCourseId] = useState('');
    const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Tên khóa học", flex: 1 },
        { field: "rating", headerName: "Lượt đánh giá", flex: 0.5 },
        { field: "purchased", headerName: "Số học viên", flex: 0.5 },
        { field: "created_at", headerName: "Ngày tạo", flex: 0.5 },
        {
            field: "edit",
            headerName: "Sửa",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link href={`/admin/edit-course/${params.row.id}`}>
                            <FiEdit2 className="dark:text-white text-black mt-4" size={20} />
                        </Link>
                    </>
                );
            },
        },
        {
            field: "delete",
            headerName: "Xóa",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button onClick={() => { setOpen(!open); setCourseId(params.row.id) }}>
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
    register('vi-VI', (_number, index) => {
        const timeString = [
            ['vừa xong', 'một lúc'],
            ['%s giây trước', 'trong %s giây'],
            ['1 phút trước', 'trong 1 phút'],
            ['%s phút trước', 'trong %s phút'],
            ['1 giờ trước', 'trong 1 giờ'],
            ['%s giờ trước', 'trong %s giờ'],
            ['1 ngày trước', 'trong 1 ngày'],
            ['%s ngày trước', 'trong %s ngày'],
            ['1 tuần trước', 'trong 1 tuần'],
            ['%s tuần trước', 'trong %s tuần'],
            ['1 tháng trước', 'trong 1 tháng'],
            ['%s tháng trước', 'trong %s tháng'],
            ['1 năm trước', 'trong 1 năm'],
            ['%s năm trước', 'trong %s năm'],
        ];
        return timeString[index];
    });

    const rows: any = [];
    if (data && data.courses) {
        data.courses.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                rating: item.rating.toFixed(0, 2),
                purchased: item.purchased,
                created_at: format(item.createdAt, "vi-VI"),
            })
        });
    }

    useEffect(() => {
        if (isSuccess) {
            refetch();
            setOpen(false);
            toast.success("Xóa khóa học thành công");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error]);

    const handleDelete = async () => {
        const id = courseId;
        await deleteCourse(id);
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
                                width: "100%", maxWidth: "1200px", padding: "20px", borderRadius: 0.2, bgcolor: '#3a90a1', overflow: null
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
                            {open && (
                                <Modal
                                    open={open}
                                    onClose={() => setOpen(!open)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                        <h1 className={`${style.title} dark:text-white text-sm`}>
                                            Bạn có muốn xóa khóa học này không?
                                        </h1>
                                        <div className="flex w-full items-center justify-between mb-6 mt-4">
                                            <div
                                                className={`${style.button} !w-[120px] h-[30px] bg-[#57c7a3] flex justify-center items-center cursor-pointer rounded`}
                                                onClick={() => setOpen(false)}
                                            >
                                                Hủy bỏ
                                            </div>
                                            <div
                                                className={`${style.button} !w-[120px] h-[30px] bg-[#d63f3f] flex justify-center items-center cursor-pointer rounded ml-5`}
                                                onClick={handleDelete}
                                            >
                                                Xóa
                                            </div>
                                        </div>
                                    </Box>
                                </Modal>
                            )}
                        </Box>
                    )
            }
        </div>
    )
}

export default AllCourses