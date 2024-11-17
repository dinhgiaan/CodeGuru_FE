'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Policy from "./Policy"
import Footer from '../components/Footer'
type Props = {}

const page = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActive] = useState(5);
    const [route, setRoute] = useState("Login");

    return (
        <>
            <div className='flex flex-col min-h-screen'>
                <Heading
                    title="Chính sách của CodeGuru"
                    description='CodeGuru là trang web cung cấp các khóa học đa dạng'
                    keywords='Programming, MERN, Redux, LMS'
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    route={route}
                    setRoute={setRoute}
                />
                <Policy />
                <Footer />
            </div>
        </>
    )
}

export default page
