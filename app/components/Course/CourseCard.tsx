import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Rating from '@/app/utils/Rating';
import { AiOutlineUnorderedList } from 'react-icons/ai';
type Props = {
    item: any;
    isProfile?: boolean;
}

const CourseCard: FC<Props> = ({ item, isProfile }) => {
    const formatVNDPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };
    return (
        <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
            <div className="w-full min-h-[45vh] bg-gray-200 dark:bg-cyan-800 border rounded-md p-3 shadow-sm">
                <div className='w-full h-52 flex justify-center items-center overflow-hidden rounded pb-9'>
                    <Image
                        src={item.thumbnail.url}
                        width={500}
                        height={300}
                        objectFit="cover"
                        className="rounded w-full"
                        alt=""
                    />
                    <br />
                </div>
                <h1 className="font-Poppins text-[16px] text-black dark:text-white">
                    {item.name}
                </h1>
                <div className="w-full flex items-center justify-between pt-2">
                    <Rating rating={item.rating} />
                    <h5 className={`text-black dark:text-white ${isProfile && "hidden 800px:inline"
                        }`}>
                        {item.purchased} học viên đã học
                    </h5>
                </div>
                <div className="w-full flex items-center justify-between pt-3">
                    <div className="flex">
                        <h3 className="text-black dark:text-white">
                            {item.price === 0 ? "Miễn phí" : formatVNDPrice(item.price)}
                        </h3>
                        <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-white">
                            {formatVNDPrice(item.suggestedPrice)}
                        </h5>
                    </div>
                    <div className='flex items-center pb-3'>
                        <AiOutlineUnorderedList size={20} fill='#fff' />
                        <h5 className='pl-2 text-black dark:text-[#fff]'>
                            {item.courseData?.length} chương
                        </h5>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default CourseCard