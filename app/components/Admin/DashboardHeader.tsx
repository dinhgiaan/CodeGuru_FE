"use client";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";

// Initialize socket client conditionally when needed
const ENDPOINT = process.env.NEXT_PUBLIC_SERVER_URL || "";

type Notification = {
  _id: string;
  title: string;
  message: string;
  status: string;
  createdAt: string;
};

type Props = {};

const DashboardHeader: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<Notification[]>([]); // Proper typing
  const [audio] = useState(
    () => new Audio("/path/to/your/notification-sound.mp3")
  ); // Replace with your sound file path

  const playNotificationSound = () => {
    try {
      audio.play();
    } catch (err) {
      console.error("Failed to play notification sound:", err);
    }
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.Notifications.filter(
          (item: Notification) => item.status === "unread"
        )
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load(); // Ensure audio is loaded correctly
  }, [data, isSuccess]);

  // Initialize socket connection inside useEffect
  useEffect(() => {
    const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    // Listen for new notifications
    socket.on("newNotification", (newData) => {
      refetch();
      playNotificationSound();
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [refetch]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  const toggleNotifications = () => setOpen(!open);

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={toggleNotifications}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[380px] h-[50vh] dark:bg-[#1e293b] bg-white shadow-2xl absolute top-16 right-0 z-10 rounded-md overflow-hidden transition-all duration-300">
          <h5 className="text-center text-[20px] font-semibold text-black dark:text-white p-3 border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            Thông báo
          </h5>
          {notifications.map((item: Notification) => (
            <div
              key={item._id}
              className="dark:bg-[#2d3a4ea1] bg-[#f0f4f8] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] transition-transform duration-300"
            >
              <div className="w-full flex items-center justify-between p-3 hover:bg-[#e5e7eb] dark:hover:bg-[#374151] transition-colors rounded-md">
                <p className="text-black dark:text-yellow-400">{item.title}</p>
                <p
                  className="text-black dark:text-green-500 cursor-pointer flex items-center"
                  onClick={() => handleNotificationStatusChange(item._id)}
                >
                  Đánh dấu đã đọc <TiTick className="ml-1" />
                </p>
              </div>
              <p className="px-3 text-black dark:text-white text-sm">
                {item.message}
              </p>
              <p className="p-3 text-black dark:text-white text-[14px] opacity-60">
                {format(item.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
