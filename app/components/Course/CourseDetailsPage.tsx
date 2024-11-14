import { useGetCoursesDetailsQuery } from "@/redux/features/course/courseAPI";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import CourseDetails from "./CourseDetails";
import Footer from "../Footer";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  console.log(id);
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCoursesDetailsQuery(id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={
              data?.course?.name
                ? `${data.course.name} - Code Guru`
                : "Loading..."
            }
            description="Code Guru là một chương trình được phát triển theo hướng cộng đồng, được thực hiện bởi Đinh Gia Ân và các lập trình viên khác nhằm giúp đỡ người dùng trong quá trình học tập"
            keywords={data?.course?.tags ?? []}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {data && data.course && <CourseDetails data={data.course} />}

          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
