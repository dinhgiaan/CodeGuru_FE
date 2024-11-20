'use client';
import React, { FC, useEffect, useState } from 'react';
import { useEditCourseMutation, useGetAllCoursesQuery } from '@/redux/features/course/courseAPI';
import CourseContent from './CourseContent';
import CourseData from './CourseData';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CoursePreview from './CoursePreview';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';


type Props = {
    id: string
};

const EditCourse: FC<Props> = ({ id }) => {
    const [editCourse, { isSuccess, error }] = useEditCourseMutation();
    const { data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const editCourseData = data?.courses?.find((i: any) => i._id === id);
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Cập nhật khóa học thành công");
            redirect("/admin/courses");
            refetch();
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error]);

    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                price: editCourseData.price,
                suggestedPrice: editCourseData.suggestedPrice,
                tags: editCourseData.tags,
                level: editCourseData.level,
                demoUrl: editCourseData.demoUrl,
                thumbnail: editCourseData?.thumbnail?.url
            })
            setBenefits(editCourseData.benefits);
            setrequirements(editCourseData.requirements);
            setCourseContentData(editCourseData.courseData);
        }
    }, [editCourseData])

    const [courseInfo, setCourseInfo] = useState({
        name: '',
        description: '',
        price: '',
        suggestedPrice: '',
        tags: '',
        level: '',
        demoUrl: '',
        thumbnail: '',
    });

    const [benefits, setBenefits] = useState([{ title: '' }]);
    const [requirements, setrequirements] = useState([{ title: '' }]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: '',
            title: '',
            description: '',
            videoSection: 'Phần chưa đặt tên',
            videoLength: '',
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

        // format requirements
        const formatRequirements = requirements.map((requirements) => ({ title: requirements.title }));

        // format courseContentData
        const formatCourseContentData = courseContentData.map((courseContent) => ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videoLength: courseContent.videoLength,
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
            suggestedPrice: courseInfo.suggestedPrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formatBenefits,
            requirements: formatRequirements,
            courseData: formatCourseContentData,
        };
        setCourseData(data);
    };
    // console.log(courseData); //feature: đổi qua uncontrolled component

    const handleCourseCreate = async (e: any) => {
        const data = courseData;
        await editCourse({ id: editCourseData?._id, data });
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
                        requirements={requirements}
                        setrequirements={setrequirements}
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
                        isEdit={true}
                    />
                )}

            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    );
};

export default EditCourse;