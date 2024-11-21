"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGetUsersAllCoursesQuery } from "@/redux/features/course/courseAPI";
import Heading from "../utils/Heading";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import { style } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    console.log("categoriesData:", categoriesData); // Kiểm tra dữ liệu trả về từ API

    if (isLoading) return;

    if (!data?.course) return;

    let filteredCourses = data?.course;

    // Lọc theo danh mục
    if (category !== "All") {
      filteredCourses = filteredCourses.filter(
        (item: any) => item.categories && item.categories === category
      );
    }

    // Lọc theo tìm kiếm
    if (search) {
      filteredCourses = filteredCourses.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setCourses(filteredCourses);
  }, [data, category, search, isLoading]);

  // Lấy danh mục từ API (sử dụng dữ liệu categoriesData)
  const categories = categoriesData?.Layout?.categories || [];

  return (
    <div>
      {isLoading || categoriesLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
            <Heading
              title={"Tất cả khóa học - CodeGuru"}
              description={
                "Code Guru là một chương trình dành cho cộng đồng công nghệ thông tin"
              }
              keywords={
                "Cộng đồng công nghệ thông tin, chuyên môn về lập trình, phát triển"
              }
            />
            <br />
            {/* Hiển thị danh mục */}
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                Tất cả
              </div>
              {categories && categories.length > 0 ? (
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item.title
                          ? "bg-[crimson]"
                          : "bg-[#5050cb]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item.title)} // Lựa chọn danh mục
                    >
                      {item.title}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">Không có danh mục nào</p>
              )}
            </div>

            {/* Hiển thị các khóa học */}
            {courses.length === 0 && (
              <p
                className={`${style.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? "Không tìm thấy khóa học mà bạn muốn tìm"
                  : "Khóa học bạn muốn tìm không có trong mục này, hãy chọn mục khác"}
              </p>
            )}

            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500x:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
