import React, { FC, use, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { style } from "../../../../app/styles/style"
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import toast from "react-hot-toast";


type Props = {
  isTeam: boolean;
};


const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation();
  const { isLoading, data, error } = useGetAllUsersQuery({});
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation({});


  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      toast.success("Cập nhật vai trò người dùng thành công!");
      setActive(false);
    }
    if (deleteSuccess) {
      toast.success("Xóa người dùng thành công!");
      setOpen(false);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Họ và tên", flex: 0.4 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Vai trò", flex: 0.2 },
    { field: "created_at", headerName: "Ngày tham gia", flex: 0.3 },
    {
      field: " ",
      headerName: "Xóa",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setOpen(!open);
              setUserId(params.row.id);
            }}
          >
            <AiOutlineDelete className="dark:text-white text-black" size={20} />
          </Button>
        );
      },
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </Button>
        );
      },
    },
  ];

  const localeText = {
    noRowsLabel: "Không có dữ liệu",
    noResultsOverlayLabel: "Không tìm thấy kết quả",
    errorOverlayDefaultLabel: "Có lỗi xảy ra",
    footerRowSelected: (count: number) => `${count} người dùng được chọn`,
    footerTotalRows: "Tổng số học viên:",
    footerPage: "Trang",
    footerPaginationRowsPerPage: "Học viên mỗi trang:",
    footerPaginationButton: "Đi",
  };

  const rows: any = [];

  if (data) {
    if (isTeam) {
      // Hiển thị các admin khi isTeam = true
      const adminData = data.users.filter((item: any) => item.role === "admin");
      adminData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          created_at: format(item.createdAt, "vi"),
        });
      });
    } else {
      // Hiển thị các role khác khi isTeam = false
      const userData = data.users.filter((item: any) => item.role !== "admin");
      userData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          created_at: format(item.createdAt, "vi"),
        });
      });
    }
  }
  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="mt-[120px] flex justify-center">
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          m="20px"
          sx={{
            width: "80%", maxWidth: "1200px", padding: "20px", borderRadius: 0.2, bgcolor: '#3a90a1',
          }
          }
        >
          {isTeam && (
            <div className="full justify-end">
              <div
                className={`flex flex-row justify-center items-center py-3 px-6 round-2 cursor-pointer bg-[#57c7a3] text-[16px] font-Poppins font-semibold !w-[190px] dark:bg-[#63ad59] !h-[35px] dark:border  dark:text-[#fff] border-none`}
                onClick={() => setActive(!active)}
              >
                Thêm thành viên
              </div>
              <br />
            </div>
          )}

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
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              localeText={localeText}
            />
          </Box>
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[30%] left-[55%] -translate-x-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${style.title} dark:text-white`}>
                  Thêm thành viên mới
                </h1>
                <div className="mt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email"
                    className={`${style.input} dark:text-white`}
                  />
                  <select
                    name=""
                    id=""
                    className={`${style.input} !mt-6 dark:text-white `}
                  >
                    <option value="admin" className="dark:text-black text-white">
                      Admin
                    </option>
                    <option value="user" className="dark:text-black text-white">Học viên</option>
                  </select>
                  <br />
                  <div
                    className={`${style.button}  my-6 !h-[30px] flex flex-row justify-center items-center py-3 px-6 !rounded-[10px] cursor-pointer bg-[#57c7a3]`}
                    onClick={handleSubmit}
                  >
                    Thêm mới
                  </div>
                </div>
              </Box>
            </Modal>
          )}

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${style.title} dark:text-white text-sm`}>
                  Bạn có muốn xóa người dùng này không?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 mt-4">
                  <div
                    className={`${style.button} w-[60px] h-[30px] bg-[#57c7a3] flex justify-center items-center cursor-pointer rounded`}
                    onClick={() => setOpen(false)}
                  >
                    Hủy bỏ
                  </div>
                  <div
                    className={`${style.button} w-[120px] h-[30px] bg-[#d63f3f] flex justify-center items-center cursor-pointer rounded ml-5`}
                    onClick={handleDelete}
                  >
                    Xóa
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
