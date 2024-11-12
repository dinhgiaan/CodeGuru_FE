import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Rating from '@/app/utils/Rating';
type Props = {
    item: any;
    isProfile?:boolean;
}

const CourseCard:FC<Props> = ({item,isProfile}) => {
  return (
    <Link href = {!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
        <div className="w-full min-h-[35vh] bg-gray-200 dark:bg-slate-500 border rounded-lg p-3 shadow-sm">

            <Image src={item.thumbnail.url} width={500} height={300} objectFit="contain" className="rounded w-full" alt="" />
            <br/>
            <h1 className="font-Poppins text-[16px] text-black dark:text-white">
                {item.name}
            </h1>
            <div className="w-full flex items-center justify-between pt-2">
                <Rating rating={item.rating} />
                <h5 className={`text-black dark:text-white ${
                    isProfile && "hidden 800px:inline"
                }`}>
                    {item.purchased} Học viên đã học
                </h5>
            </div>
            <div className="w-full flex items-center justify-between pt-3">
                <div className="flex">
                    <h3 className="text-black dark:text-white">
                        {item.price === 0 ? "Free" : item.price + "VNĐ"}
                    </h3>
                    <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-white">
                        {item.suggestedPrice}VNĐ
                    </h5>
                </div>

            </div>
        </div>
    </Link>
  )
}
export default CourseCard