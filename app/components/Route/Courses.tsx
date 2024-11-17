import { useGetUsersAllCoursesQuery } from '@/redux/features/course/courseAPI'
import React, { useEffect, useState } from 'react'
import CourseCard from "../Course/CourseCard"
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
type Props = {}

const Courses = (props: Props) => {
    const { data, isLoading } = useGetUsersAllCoursesQuery({});
    const [course, setCourses] = useState<any[]>([]);
    useEffect(() => {
        setCourses(data?.course);
    }, [data]);



    return (
        <div>
            <div className={`w-[90%] 800px:w-[80%] m-auto mt-5`}>
                <h1 className="text-center font-Roboto text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight" >
                    Định hình tương lai sự nghiệp của bạn {" "}
                    <span className="bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">với cơ hội không giới hạn</span>
                    <br />
                    Hãy bứt phá cùng các khóa học được thiết kế dành riêng cho bạn
                </h1>
                <br />
                <br />
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0 " >
                    {course &&
                        course.map((item: any, index: number) => (
                            <CourseCard item={item} key={index} />
                        ))}
                </div>
                <div className='w-full h-auto my-40 text-white text-center'>
                    <div className='text-[40px] pb-2 font-Josefin flex justify-center items-center'>
                        <div className='w-10 h-[0.9px] bg-green-700 mr-5' />
                        <span className='bg-gradient-to-r from-[#00EAFF] to-[#b1b2df] text-transparent bg-clip-text'>Các đối tác đồng hành</span>
                        <div className='w-10 h-[0.9px] bg-green-700 ml-5' />
                    </div>
                    <div>
                        <Marquee className='bg-slate-200 rounded-md py-3 px-5' speed={85} autoFill>
                            <Image
                                src={require("../../../public/assets/dinhgiaandev-logo.png")}
                                width={100}
                                height={50}
                                objectFit="contain"
                                className="mx-6"
                                alt="Dinhgiaandev logo"
                            />
                            <Image
                                src={require("../../../public/assets/hoidanit-logo.png")}
                                width={100}
                                height={50}
                                objectFit="contain"
                                className="mx-6"
                                alt="Hoidanit logo"
                            />
                            <Image
                                src={require("../../../public/assets/f8-logo.png")}
                                width={100}
                                height={50}
                                objectFit="contain"
                                className="mx-6"
                                alt="F8 logo"
                            />
                            <Image
                                src={require("../../../public/assets/trungquandev-logo.png")}
                                width={100}
                                height={50}
                                objectFit="contain"
                                className="mx-6"
                                alt="Trungquandev logo"
                            />
                            <Image
                                src={require("../../../public/assets/brainium-logo.png")}
                                width={100}
                                height={50}
                                objectFit="contain"

                                className="ml-6 mr-56"
                                alt="Brainium logo"
                            />
                        </Marquee>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Courses