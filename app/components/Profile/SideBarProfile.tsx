import React, { FC } from "react";
import Image from "next/image";
import avatarDefault from "../../../public/assets/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { IoLogOutSharp } from "react-icons/io5";
import Link from "next/link";
import { MdAdminPanelSettings } from "react-icons/md";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
          }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt=""
          width={20}
          height={20}
          className="w-[30px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
          Tài khoản của tôi
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
          }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="text-black dark:text-white" />
        <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
          Thay đổi mật khẩu
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
          }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="text-black dark:text-white" />
        <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
          Khóa học đã học
        </h5>
      </div>

      {user.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
            }`}
          href={"/admin"}
        >
          <MdAdminPanelSettings size={20} className="text-black dark:text-white" />
          <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
            Bảng điều khiển Admin
          </h5>
        </Link>
      )}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
          }`}
        onClick={() => logOutHandler()}
      >
        <IoLogOutSharp size={20} className="text-black dark:text-white" />
        <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
          Đăng xuất
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
