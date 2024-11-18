'use client'
import CourseContent from '@/app/components/Course/CourseContent';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {
    params: any;
};

const Page = ({ params }: Props) => {
    const id = params.id; // ID khóa học từ URL
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});

    useEffect(() => {
        if (isLoading || error) return; // Chờ dữ liệu hoặc xử lý lỗi

        if (data && data.user && Array.isArray(data.user.courses)) {
            // Tìm khóa học dựa trên courseId
            const isPurchased = data.user.courses.find(
                (course: any) => String(course.courseId) === String(id)
            );

            console.log("Khóa học đã mua: ", isPurchased);

            if (!isPurchased) {
                console.warn("Khóa học không tìm thấy, chuyển hướng về trang chủ...");
                redirect('/');
            }
        } else {
            console.warn("Không có dữ liệu khóa học hoặc cấu trúc không đúng.");
            redirect('/');
        }
    }, [data, id, isLoading, error]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <CourseContent id={id} />
                </div>
            )}
        </>
    );
};

export default Page;
