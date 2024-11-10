'use client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

import { useCreateCourseMutation } from '@/redux/features/course/courseAPI';

import CourseContent from './CourseContent';
import CourseData from './CourseData';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CoursePreview from './CoursePreview';


type Props = {};

const CreateCourse = (props: Props) => {
  const [active, setActive] = useState(3);
  const [createCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Tạo khóa học thành công");
      redirect("/admin");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);
  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: '',
    price: '',
    estimatedPrice: '',
    tags: '',
    level: '',
    demoUrl: '',
    thumbnail: '',
  });

  const [benefits, setBenefits] = useState([{ title: '' }]);
  const [prerequisites, setPrerequisites] = useState([{ title: '' }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: '',
      title: '',
      description: '',
      videoSection: 'Phần chưa đặt tên',
      links: [
        {
          title: '',
          url: '',
        },
      ],
      suggestion: '',
    },
  ]);

  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    // format benefits
    const formatBenefits = benefits.map((benefits) => ({ title: benefits.title }));

    // format prerequisites
    const formatPrerequisites = prerequisites.map((prerequisites) => ({ title: prerequisites.title }));

    // format courseContentData
    const formatCourseContentData = courseContentData.map((courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }));

    //prepare our data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formatBenefits,
      prerequisites: formatPrerequisites,
      courseContent: formatCourseContentData,
    };
    setCourseData(data);
  };
  // console.log(courseData); //feature: đổi qua uncontrolled component

  const handleCourseCreate = async (e: any) => {

    await handleSubmit(); // Xử lý dữ liệu trước

    if (!isLoading) {
      await createCourse(courseData); // Gửi dữ liệu đã được xử lý
    }
  }

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
          />
        )}

      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;