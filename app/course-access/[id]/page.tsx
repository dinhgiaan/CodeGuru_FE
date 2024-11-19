'use client'

import CourseContent from '@/app/components/Course/CourseContent'
import Loader from '@/app/components/Loader/Loader'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
    params: any
}

const page = ({ params }: Props) => {
    const id = params.id;
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});

    useEffect(() => {
        if (data) {
            const isPurchased = data.user.courses.find((data: any) => data.courseId === id);
            if (!isPurchased) {
                redirect("/");
            }
            if (error) {
                redirect("/");
            }
        }
    }, [data, error]);
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <CourseContent id={id} user={data.user} />
                    </div>
                )
            }
        </>
    )
}

export default page