import Image from 'next/image';
import React, { FC } from 'react';

type Props = {
    user: any;
}

const CoursesAttended: FC<Props> = ({ user }) => {
    const courses = user?.courses || [];
    const formatVNDPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <div className="text-white px-4 pb-6">
            <div className='mb-8 rounded-full bg-fuchsia-700 w-fit'>
                <p className='py-2 px-4'>{courses.length} khóa học</p>
            </div>
            {courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {courses.map((course: any) => (
                        <>
                            <div key={course?._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                <div className="w-full h-52 relative">
                                    <Image
                                        src={course.thumbnail.url}
                                        alt={course.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-t-lg"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-xl font-bold text-black dark:text-[#68d495] mb-2">{course.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-normal text-primary dark:text-[#ffffff]">
                                            {course.price === 0 ? "Miễn phí" : formatVNDPrice(course.price)}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg">Không có khóa học nào.</p>
            )}
        </div>
    );
}

export default CoursesAttended;
